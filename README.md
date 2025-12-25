# LLM Chat API Backend - Perplexity AI

A small Node.js/Express REST API that sends user prompts to Perplexity's Chat Completions endpoint and returns LLM-generated answers over HTTP.

## Architecture

Client (Postman / other service)
↓ HTTP POST /chat
Express.js backend
↓ HTTPS POST /chat/completions
Perplexity LLM API
↑ LLM answer
Express.js backend
↑ JSON { "response": "..." }
Client

## Features

- `POST /chat` endpoint that accepts a JSON prompt and returns an AI response.
- Input validation for missing/too-long prompts with clear `400` JSON errors.
- Error handling for upstream API/network failures (`5xx` responses).
- Environment-based config using `.env` and `.env.example`.
- Postman collection for testing endpoints with automated checks.

## Tech Stack

- Node.js, Express
- Perplexity Chat Completions API (`model` + `messages`)
- dotenv for environment variables
- Postman for API testing

## Getting Started

1. Clone the repository:

   git clone https://github.com/sanjayvarma2001/llm-chat-api-backend.git
   cd llm-chat-api-backend

2. Install dependencies:

   npm install

3. Set up environment variables:

   cp .env.example .env

   edit .env and set PPLX_API_KEY and PORT

4. Start the server:

   npm start

   or: node server.js

5. Test the API:

   - `GET http://localhost:3000/`
   - `POST http://localhost:3000/chat` with body:

   ```
   { "chat": "Explain binary search." }
   ```

## Postman Collection

    - Import `postman/llm-chat-api.postman_collection.json` into Postman.
    - Set `base_url` variable to `http://localhost:3000` or your deployed URL.
    - Run requests and check tests for status codes and response fields.

## Live API Endpoint

Live API: https://llm-chat-api-backend.onrender.com/chat
Usage: POST with JSON { "chat": "Hello" } to get an LLM response.
