import axios from "axios";

const apiUrl = axios.create({
  baseURL: 'https://furia-chatbot-tau.vercel.app/'
})

export const assistantResponse = async (question) => {
  try {
    const response = await apiUrl.post('/assistant', {
      message: question
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}