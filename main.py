from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pypdf import PdfReader
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

# Setup Google Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

pdf_path = "./1-page-cv.pdf"

# Load product knowledge from PDF
def extract_text_from_pdf(pdf_path: str) -> str:
    try:
        with open(pdf_path, 'rb') as file:
            reader = PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

product_knowledge = extract_text_from_pdf(pdf_path)

app = FastAPI()

@app.get("/")
async def home():
    return {"message": "Welcome to the chatbot API!"}

@app.post("/chat")
async def chat(request: Request):
    try:
        user_message = (await request.json()).get('message')
        prompt = f"You are a customer support assistant. Use the following product knowledge to answer questions: {product_knowledge}\n\nUser: {user_message}"
        response = model.generate_content(prompt)
        return JSONResponse(content={"response": response.text})
    except Exception as e:
        return JSONResponse(content={"response": f"Error: {str(e)}"}, status_code=500)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
