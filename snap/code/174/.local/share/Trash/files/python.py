import requests

url = "https://server-less-function-curpr242z-adithyenkandasamys-projects.vercel.app/api/your-function"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()  # Assuming your serverless function returns JSON data
    print("Response data:", data)
else:
    print(f"Failed to call function. Status code: {response.status_code}")
