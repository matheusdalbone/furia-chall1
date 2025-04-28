import axios from "axios";

const apiUrl = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
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