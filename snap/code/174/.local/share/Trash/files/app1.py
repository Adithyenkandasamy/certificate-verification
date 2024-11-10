import os
from flask import Flask, jsonify, request

app = Flask(__name__)

# Example of setting an API key as an environment variable in Vercel
API_KEY = os.getenv("", "o2JqT9kQdGyLEWky8vDU8V3X")  # Replace with your key in the environment variables

@app.route('/api/hello.py', methods=['GET', 'POST'])
def your_function():
    # Check the 'Authorization' header
    api_key = request.headers.get("Authorization")
    if api_key != f"Bearer {API_KEY}":
        return jsonify({"error": "Unauthorized"}), 401  # Unauthorized error if the key is incorrect
    
    if request.method == 'GET':
        return jsonify({"message": "Function called successfully!"})
    
    if request.method == 'POST':
        data = request.get_json()  # Process the incoming POST data
        return jsonify({"received_data": data})

if __name__ == "__main__":
    app.run(debug=True)
