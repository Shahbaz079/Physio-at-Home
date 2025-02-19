# Quiz App

This is a Next.js application for taking quizzes with multiple-choice questions. The app provides a 30-second timer for each question. After answering, your score will be calculated and saved along with your attempts and results in a MongoDB database. User management and authentication are handled using the Clerk component.

## Features

- Multiple-choice questions
- 30-second timer for each question
- Score calculation upon answering
- Results saved to MongoDB
- User management and authentication with Clerk

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Clerk account

### Installation

1. Clone the repository:

   
   git clone https://github.com/yourusername/quiz-app.git


2. Navigate to the project directory:
    cd quiz-app

3. Install the dependencies:

     npm install
     
     [if you face any dependency related issue :
     feel free to use= --legacy-peer-deps
     ]

4.Set up environment variables:

Create a .env.local file in the root directory and add the following variables:


MONGO_URI=<your-mongodb-uri>
DB_NAME=<dtabase-name >
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<yournext-public-clerk-publishable-key>

5. Start the development server:
   npm run dev