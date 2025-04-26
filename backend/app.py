from flask import Flask, request, jsonify
from assistant import assistant_response
app = Flask(__name__)

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
    
      return jsonify({'response': response}), 201
    else:
      return jsonify({'error': 'No JSON data found'}), 400 
  else: 
     return jsonify({'error': 'Invalid request method'}), 405