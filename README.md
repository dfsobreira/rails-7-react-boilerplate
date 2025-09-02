# Rails Boilerplate

Welcome to this Rails boilerplate with React, Stimulus, and Tailwind CSS.

## Setup

**1. Create environment file:**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

**2. Start with Docker:**

```bash
docker-compose up --build
# App will be available at http://localhost:3000
```

## Project Structure

```
app/javascript/
├── application.js          # Main entry point
├── components/             # React components
├── controllers/            # Stimulus controllers
└── helpers/                # JavaScript helpers
```
