### Ingredient Lense

It is an AI powered cosmetic ingredient analysis platform that analyzes cosmetic product iingredients and provides evidence based information about theri benefits, risks, and propeties.

## Overview

Ingredient Lens is a full-stack MERN web application that allows user to upload an image of cosmetic product's ingredient list and receive a detailed analysis of the ingredients

The application uses OCR processing to extract ingredients from the upload image, searches the database for previouslt generated analyses and only run the expensive research and Ai processing pipeline when an analysis is not already available.

The architecture reduces unnecessary AI processing and improves response time for frequently requested ingredients while keeping the cost down.

## Features

- Upload an image of a cosmetic ingredient list
- Automatically extract ingredients form images
- Identify and normalize cosmetic ingredients
- Return previously generated analyses from the database
- AI-powered ingredient analysis
- Evidence-based research using scientific literature
- Store generated analyses for future requests
- Fuzzy ingredient matching
- Display ingredient benefits, risks, and properties
- Responsive frontend interface

## Tech stack

# FrontEnd

    - React
    - Tailwind
    - Typescript

# BackEnd

    - Node.js
    - Express.js
    - MongoDB
    - Mongoose

# Processing sources

    - Pubmed
    - DermNet
    - Inkeedecoder

# AI

    - Gemini
    - Groq
    - llama3.1:8b-instruct-q4_K_M

# Services

    - Multer
    - MongoDB Atlas
    - Cheerio
    - Axios
    - Tanstack Query
    - Jsonwebtoken

## Project Structure

    IngredientLens/
        |
        |--API/
        |   |
        |   |-- Config_DB
        |   |-- Controllers
        |   |-- Middlewares
        |   |-- Models
        |   |-- Public
        |   |-- Routes
        |   |-- Services
        |   |-- Utils
        |   |-- Index.js
        |   |
        |   |-- package.json
        |
        |--Web/
        |   |
        |   |-- src/
        |   |   |-- API_Services
        |   |   |-- assets
        |   |   |-- Components
        |   |   |-- Pages
        |   |   |-- App.tsx
        |   |   |-- index.css
        |   |   |-- Main.tsx
        |   |
        |
        |--README.md
