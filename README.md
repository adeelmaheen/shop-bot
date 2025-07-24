# Shopify Chatbot with Google Gemini API

## Overview
This project integrates a custom AI-powered chatbot into a Shopify store using the Google Gemini API. The chatbot is designed to assist customers by providing real-time responses based on detailed product information extracted from a PDF document.

## Features
- AI-Powered Assistance: Utilizes Google Gemini API for intelligent responses.
- Product Knowledge Integration: Extracts and incorporates product details from a PDF.
- Shopify Integration: Seamlessly integrates with Shopify stores.
- Customizable Responses: Tailor the chatbot's behavior and knowledge base.

## Technologies Used
- Backend: FastAPI
- AI: Google Gemini API
- PDF Parsing: PyPDF2
- Frontend: JavaScript for chatbot widget
- Shopify: Liquid templating for integration

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shopify-gemini-chatbot.git
cd shopify-gemini-chatbot


# run the file:   uvicorn main:app --reload
# for query to chat bot :   curl -X POST "http://127.0.0.1:8000/chat" -H "Content-Type: application/json" -d "{\"message\": \"Tell me about who is maheen arif\"}"

# Home page: https://your-project-name.vercel.app/

# Chat endpoint: https://your-project-name.vercel.app/chat