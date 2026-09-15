# Ingredient Lense

It is an AI powered cosmetic ingredient analysis platform that analyzes cosmetic product iingredients and provides evidence based information about theri benefits, risks, and propeties.

## Overview

Ingredient Lens is a full-stack MERN web application that allows user to upload an image of cosmetic product's ingredient list and receive a detailed analysis of the ingredients

The application uses OCR processing to extract ingredients from the upload image, searches the database for previouslt generated analyses and only run the expensive research and Ai processing pipeline when an analysis is not already available.

The architecture reduces unnecessary AI processing and improves response time for frequently requested ingredients while keeping the cost down.

## Features

- Upload an image of a cosmetic ingredient list
- Automatically extract ingredients form images
- Identify and normalize cosmetic ingredients
- Database first Architecture
- AI-powered ingredient analysis
- Evidence-based research using scientific literature
- Store generated analyses for future requests
- Fuzzy ingredient matching
- Display ingredient benefits, risks, and properties
- Responsive frontend interface
- User analysis History

# How It Works

This application follows Database-first approach

```text
                    ┌─────────────────────┐
                    │  User uploads Image │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Multer Middleware  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Text Extraction     │
                    │ using OCR service   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Ingredient Search   │
                    │      Database       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                Analysis              No Analysis
                 Exists                  Found
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────────┐
          │ Return Stored   │   │   Call Processing   │
          │ Analysis        │   │     Pipeline        │
          └────────┬────────┘   └──────────┬──────────┘
                   │                       │
                   │                       ▼
                   │              ┌─────────────────┐
                   │              │ Store Analysis  │
                   │              │    in Database  │
                   │              └────────┬────────┘
                   │                       │
                   └───────────┬───────────┘
                               ▼
                    ┌─────────────────────┐
                    │  Analysis Response  │
                    └─────────────────────┘
```

### Pipeline Logic

1. The user uploads an image of cosmetic ingredient list.
2. The application extracts the ingredient names from the image.
3. Extracted ingredients are searched against the ingredient database.
4. For every matched ingredient:
   - If an analysis already exists, the stored analysis is returned.
   - If an analysis does not exist, the ingredient is sent to the processing pipeline.
5. The processing pipeline researches and summarizes available evidence.
6. The generated analysis is stored in the database.
7. The final analysis is returned to the frontend.

This means an ingredient does not need to be processed by the AI pipeline repeatedly.

---

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
        |   └── package.json
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
        |   |   └── Main.tsx
        |   └── package.json
        |
        ├── .gitignore
        └── README.md

## Backend Pipeline

The backenbd is responsible for the core ingredient processing workflow.

```text
Image
  │
  ▼
Text Extraction
  │
  ▼
Ingredient Search
  │
  ▼
MongoDB
  │
  ├── Analysis exists ──────► Return analysis
  │
  └── Analysis missing
             │
             ▼
       Process Pipeline
             │
             ├── Research
             ├── Evidence extraction
             └── Summarization
             │
             ▼
       Store in MongoDB
             │
             ▼
       Return Analysis
```

## Why Database-First?

AI processing is computationally expensive and may involve external API calls.

Instead of doing this:

```text
Request
   │
   ▼
LLM Pipeline
   │
   ▼
Database
```

the application uses:

```text
Request
   │
   ▼
Database
   │
   ├── Found ──────► Return
   │
   └── Not Found
          │
          ▼
       AI Pipeline
          │
          ▼
       Database
```

This provides:

- Faster responses for previously analyzed ingredients
- Fewer LLM API calls
- Lower API costs
- Reduced processing time
- Persistent analysis
- Better scalability

---

# Research Pipeline

The AI pipeline is designed to produce evidence-based cosmetic ingredient summaries.

The pipeline uses scientific literature as the basis for its analysis and emphasizes the distinction between:

- Established findings
- Potential benefits
- Potential risks
- Limited evidence
- Uncertain conclusions

Rather than simply generating generic information, the system aims to connect claims with supporting research.

Example output structure:

```text
Ingredient
    │
    ├── Cosmetic Function
    │
    ├── Benefits
    │
    ├── Potential Risks
    │
    └── Scientific Evidence
             │
             ├── Study 1
             ├── Study 2
             └── Study 3
```

---

# Database

The application uses MongoDB to store ingredient information and generated analyses.

An ingredient record can contain information such as:

```javascript
{
    name: "Example Ingredient",
    aliases: [
        "Alternative Name"
    ],
    analysis: {
        benefits: [],
        risks: [],
        function: [],
        evidence: []
    }
}
```

The database also acts as an **analysis cache**.

Once an ingredient has been analyzed, its result can be reused for future requests.

---

# Search

Ingredient searching is handled through MongoDB search functionality.

The search layer allows the application to locate ingredients based on their names and aliases rather than relying only on exact string matching.

This is useful because cosmetic ingredient names may appear in different forms.

For example:

```text
Extracted:
Foeniculum Vulgare Fruit Extract

Database:
Foeniculum vulgare (Fennel) Fruit Extract
```

The search system can help identify the corresponding database entry.

---

# Tech stack

### FrontEnd

    - React
    - Tailwind
    - Typescript

### BackEnd

    - Node.js
    - Express.js
    - MongoDB
    - Mongoose

### Processing sources

    - Pubmed
    - DermNet
    - Inkeedecoder

### AI

    - Gemini
    - Groq
    - llama3.1:8b-instruct-q4_K_M

### Services

    - Multer
    - MongoDB Atlas
    - Cheerio
    - Axios
    - Tanstack Query
    - Jsonwebtoken

---

# Development Workflow

A typical request looks like:

```text
User
 │
 │ Upload image
 ▼
React Frontend
 │
 │ HTTP Request
 ▼
Express API
 │
 ▼
Ingredient Extraction
 │
 ▼
MongoDB Search
 │
 ├───────────────┐
 │               │
 ▼               ▼
Found          Not Found
 │               │
 ▼               ▼
Existing       AI Research
Analysis       Pipeline
 │               │
 │               ▼
 │            Store Result
 │               │
 └───────┬───────┘
         ▼
      API Response
         │
         ▼
    React Frontend
```

---

# Design Philosophy

Ingredient Lens is built around three main principles.

### 1. Evidence Over Assumptions

Ingredient information should be grounded in available scientific evidence rather than generated from unsupported assumptions.

### 2. Reuse Before Recompute

If an ingredient has already been analyzed, the application should reuse the stored result instead of processing it again.

### 3. Simplicity for the User

The complexity of image processing, database search, scientific research, and AI summarization should remain behind the interface.

The user should only need to provide an image of ingredient list and receive an understandable result.

---

# Performance Strategy

The application uses caching at the ingredient-analysis level.

For example, suppose 100 users search for the same ingredient:

```text
User 1 ──► Database ──► No analysis
                         │
                         ▼
                     AI Pipeline
                         │
                         ▼
                    Save Analysis

User 2 ──► Database ──► Analysis exists ──► Return

User 3 ──► Database ──► Analysis exists ──► Return

User 4 ──► Database ──► Analysis exists ──► Return

...

User 100 ─► Database ──► Analysis exists ──► Return
```

Instead of running the AI pipeline 100 times, the system can reuse the stored analysis.

---

# Future Improvements

Potential improvements include:

- Product-level analysis
- Ingredient safety scoring
- More advanced ingredient synonym matching
- Improved OCR accuracy
- Batch ingredient processing
- Analysis versioning
- Confidence scores for extracted ingredients
- More scientific data sources
- Ingredient interaction analysis
- Personalized product recommendations
- Background processing for large ingredient lists
- Improved caching and request deduplication
- Using Redis to reduce database calls

---

# Project Goals

IngredientsApp aims to bridge the gap between complex cosmetic ingredient information and everyday users.

The long-term goal is to create a system where users can quickly understand **what is in their cosmetic products, what each ingredient does, and what scientific evidence exists behind those claims.**

---
