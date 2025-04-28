from flask import Flask, request, jsonify
from flask_cors import CORS
from assistant import assistant_response

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
  return "Hello world!"

@app.route("/assistant", methods=['POST'])
def furia_chat():
  if request.method == 'POST':
    data = request.get_json()
    if data:
      message = data['message']
      response = assistant_response(message)
    
      return jsonify({'text': response, 'type': 'assistant'}), 201
    else:
      return jsonify({'error': 'No JSON data found'}), 400 
  else: 
     return jsonify({'error': 'Invalid request method'}), 405