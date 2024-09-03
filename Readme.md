# Bookstore API

## Project Overview

The Bookstore API is a RESTful service that allows users to manage a collection of books. This API provides functionalities for creating, reading, updating, and deleting books, along with user authentication and search capabilities.

## Features

### CRUD Operations

- **Create:** Add a new book to the collection.
- **Read:** Fetch details of a single book or list all books.
- **Update:** Modify details of an existing book.
- **Delete:** Remove a book from the collection.

### User Authentication

- User registration and login with JWT (JSON Web Tokens).
- Protected routes to ensure only authenticated users can add, update, or delete books.

### Search & Filtering

- Search for books by title and author.
- Pagination for listing books.

### Database

- MongoDB for storing book data and user credentials.


## Setup and Running

### Prerequisites

- Node.js (version 18.17.0)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anmolsingh0608/bookstore.git
   ```
2. Navigate to the project directory
3. Run - npm install
4. Rename .env.example to .env and add the required variables that are listed there.

### Run the server

- npm start

### Run the unit test

- npm test

### API Docs

- Postman - https://red-comet-547450.postman.co/workspace/My-Workspace~f420876a-7d74-45a6-8bd1-d73eac15a662/collection/10981604-1eea2c15-58ef-464f-b764-144da1c130c7?action=share&creator=10981604
