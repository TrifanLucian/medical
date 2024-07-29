export default {
  "roles": [
    {
      "name": "Admin",
      "users": [
        {
          "username": "admin",
          "email": "admin@example.com",
          "password": "password",
          "first_name": "Admin",
          "last_name": "User",
          "avatar_url": null,
          "country": null,
          "bio": null,
          "created_at": "2024-07-29T00:00:00Z",
          "active_sessions": [
            {
              "token": "admin_token",
              "created_at": "2024-07-29T00:00:00Z"
            }
          ]
        }
      ]
    },
    {
      "name": "User",
      "users": [
        {
          "username": "user1",
          "email": "user1@example.com",
          "password": "password",
          "first_name": "User",
          "last_name": "One",
          "avatar_url": null,
          "country": null,
          "bio": null,
          "created_at": "2024-07-29T00:00:00Z",
          "active_sessions": [
            {
              "token": "user1_token",
              "created_at": "2024-07-29T00:00:00Z"
            }
          ]
        },
        {
          "username": "user2",
          "email": "user2@example.com",
          "password": "password",
          "first_name": "User",
          "last_name": "Two",
          "avatar_url": null,
          "country": null,
          "bio": null,
          "created_at": "2024-07-29T00:00:00Z",
          "active_sessions": [
            {
              "token": "user2_token",
              "created_at": "2024-07-29T00:00:00Z"
            }
          ]
        }
      ]
    }
  ],
  "questionTypes": [
    {
      "name": "Multiple Choice",
      "num_choices": 4,
      "num_correct": 1,
      "multiple_choice": true,
      "created_at": "2024-07-29T00:00:00Z"
    },
    {
      "name": "True/False",
      "num_choices": 2,
      "num_correct": 1,
      "multiple_choice": false,
      "created_at": "2024-07-29T00:00:00Z"
    }
  ],
  "questions": [
    {
      "question_text": "What is the capital of France?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Paris", "is_correct": true },
        { "choice_text": "London", "is_correct": false },
        { "choice_text": "Berlin", "is_correct": false },
        { "choice_text": "Madrid", "is_correct": false }
      ]
    },
    {
      "question_text": "Is the sky blue?",
      "question_type": "True/False",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "True", "is_correct": true },
        { "choice_text": "False", "is_correct": false }
      ]
    },
    {
      "question_text": "What is 2+2?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "3", "is_correct": false },
        { "choice_text": "4", "is_correct": true },
        { "choice_text": "5", "is_correct": false },
        { "choice_text": "6", "is_correct": false }
      ]
    },
    {
      "question_text": "What is the chemical symbol for water?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "H2O", "is_correct": true },
        { "choice_text": "O2", "is_correct": false },
        { "choice_text": "CO2", "is_correct": false },
        { "choice_text": "NaCl", "is_correct": false }
      ]
    },
    {
      "question_text": "How many planets are in the Solar System?",
      "question_type": "Multiple Choice",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "7", "is_correct": false },
        { "choice_text": "8", "is_correct": true },
        { "choice_text": "9", "is_correct": false },
        { "choice_text": "10", "is_correct": false }
      ]
    },
    {
      "question_text": "What is the speed of light?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "299,792 km/s", "is_correct": true },
        { "choice_text": "150,000 km/s", "is_correct": false },
        { "choice_text": "300,000 km/s", "is_correct": false },
        { "choice_text": "100,000 km/s", "is_correct": false }
      ]
    },
    {
      "question_text": "Who was the first president of the United States?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "George Washington", "is_correct": true },
        { "choice_text": "Thomas Jefferson", "is_correct": false },
        { "choice_text": "Abraham Lincoln", "is_correct": false },
        { "choice_text": "John Adams", "is_correct": false }
      ]
    },
    {
      "question_text": "In which year did World War II end?",
      "question_type": "Multiple Choice",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "1944", "is_correct": false },
        { "choice_text": "1945", "is_correct": true },
        { "choice_text": "1946", "is_correct": false },
        { "choice_text": "1947", "is_correct": false }
      ]
    },
    {
      "question_text": "What was the name of the ship that brought the Pilgrims to America?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Mayflower", "is_correct": true },
        { "choice_text": "Santa Maria", "is_correct": false },
        { "choice_text": "Speedwell", "is_correct": false },
        { "choice_text": "Pinta", "is_correct": false }
      ]
    },
    {
      "question_text": "Who developed the theory of relativity?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Albert Einstein", "is_correct": true },
        { "choice_text": "Isaac Newton", "is_correct": false },
        { "choice_text": "Galileo Galilei", "is_correct": false },
        { "choice_text": "Nikola Tesla", "is_correct": false }
      ]
    },
    {
      "question_text": "Which planet is known as the Red Planet?",
      "question_type": "Multiple Choice",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Mars", "is_correct": true },
        { "choice_text": "Jupiter", "is_correct": false },
        { "choice_text": "Saturn", "is_correct": false },
        { "choice_text": "Venus", "is_correct": false }
      ]
    },
    {
      "question_text": "What is the largest ocean on Earth?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Pacific Ocean", "is_correct": true },
        { "choice_text": "Atlantic Ocean", "is_correct": false },
        { "choice_text": "Indian Ocean", "is_correct": false },
        { "choice_text": "Arctic Ocean", "is_correct": false }
      ]
    },
    {
      "question_text": "Who painted the Mona Lisa?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Leonardo da Vinci", "is_correct": true },
        { "choice_text": "Vincent van Gogh", "is_correct": false },
        { "choice_text": "Pablo Picasso", "is_correct": false },
        { "choice_text": "Claude Monet", "is_correct": false }
      ]
    },
    {
      "question_text": "What is the smallest unit of matter?",
      "question_type": "Multiple Choice",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Atom", "is_correct": true },
        { "choice_text": "Molecule", "is_correct": false },
        { "choice_text": "Electron", "is_correct": false },
        { "choice_text": "Proton", "is_correct": false }
      ]
    },
    {
      "question_text": "Which element has the chemical symbol 'O'?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Oxygen", "is_correct": true },
        { "choice_text": "Osmium", "is_correct": false },
        { "choice_text": "Gold", "is_correct": false },
        { "choice_text": "Oganesson", "is_correct": false }
      ]
    },
    {
      "question_text": "How many continents are there on Earth?",
      "question_type": "Multiple Choice",
      "created_by": "admin",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "7", "is_correct": true },
        { "choice_text": "6", "is_correct": false },
        { "choice_text": "8", "is_correct": false },
        { "choice_text": "5", "is_correct": false }
      ]
    },
    {
      "question_text": "What is the longest river in the world?",
      "question_type": "Multiple Choice",
      "created_by": "user1",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Nile", "is_correct": true },
        { "choice_text": "Amazon", "is_correct": false },
        { "choice_text": "Yangtze", "is_correct": false },
        { "choice_text": "Mississippi", "is_correct": false }
      ]
    },
    {
      "question_text": "Who wrote 'To Kill a Mockingbird'?",
      "question_type": "Multiple Choice",
      "created_by": "user2",
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "choices": [
        { "choice_text": "Harper Lee", "is_correct": true },
        { "choice_text": "Mark Twain", "is_correct": false },
        { "choice_text": "F. Scott Fitzgerald", "is_correct": false },
        { "choice_text": "Ernest Hemingway", "is_correct": false }
      ]
    }
  ],
  "questionnaireTypes": [
    {
      "name": "General Knowledge",
      "is_infinite": false,
      "created_at": "2024-07-29T00:00:00Z"
    },
    {
      "name": "Science",
      "is_infinite": false,
      "created_at": "2024-07-29T00:00:00Z"
    },
    {
      "name": "History",
      "is_infinite": false,
      "created_at": "2024-07-29T00:00:00Z"
    },
    {
      "name": "Geography",
      "is_infinite": false,
      "created_at": "2024-07-29T00:00:00Z"
    }
  ],
  "questionnaires": [
    {
      "name": "General Knowledge Quiz",
      "type": "General Knowledge",
      "created_by": "admin",
      "max_wrong_answers": 3,
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "questions": [
        "What is the capital of France?",
        "Is the sky blue?",
        "What is 2+2?",
        "How many continents are there on Earth?",
        "Who wrote 'To Kill a Mockingbird?'"
      ]
    },
    {
      "name": "Science Quiz",
      "type": "Science",
      "created_by": "user1",
      "max_wrong_answers": 2,
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "questions": [
        "What is the chemical symbol for water?",
        "How many planets are in the Solar System?",
        "What is the speed of light?",
        "Who developed the theory of relativity?",
        "What is the smallest unit of matter?"
      ]
    },
    {
      "name": "History Quiz",
      "type": "History",
      "created_by": "user2",
      "max_wrong_answers": 4,
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "questions": [
        "Who was the first president of the United States?",
        "In which year did World War II end?",
        "What was the name of the ship that brought the Pilgrims to America?",
        "Who painted the Mona Lisa?",
        "Who wrote 'To Kill a Mockingbird?'"
      ]
    },
    {
      "name": "Geography Quiz",
      "type": "Geography",
      "created_by": "admin",
      "max_wrong_answers": 3,
      "is_submitted": true,
      "submission_status": "approved",
      "created_at": "2024-07-29T00:00:00Z",
      "questions": [
        "What is the capital of France?",
        "Which planet is known as the Red Planet?",
        "What is the largest ocean on Earth?",
        "How many continents are there on Earth?",
        "What is the longest river in the world?"
      ]
    }
  ]
}
