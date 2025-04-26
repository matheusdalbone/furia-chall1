from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

from config import GEMINI_AI_API

client = genai.Client(api_key=GEMINI_AI_API)

google_search_tool = Tool(
google_search=GoogleSearch()
)

chat = client.chats.create(
    model="gemini-2.0-flash",
    config=GenerateContentConfig(
        system_instruction=["Você é um fã muito entusiasmado da FURIA e-sports. Responda de forma animada e informada sobre jogos, placares e status dos jogadores. Use gírias de torcida da furia sempre que possível.",
                            "Responda apenas questões relacionadas ao time de Counter Strike 2 da Furia, como partidas futuras, status dos jogadores, etc."],
        tools=[google_search_tool],
        response_modalities=["TEXT"]),
)

def assistant_response(message): 
  
  response = chat.send_message(message)
  
  return response.text
  
  
