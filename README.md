# Contact Manager Backend

This is the backend part of the Contact Manager project, built using Node.js, Express.js, and MongoDB. The Contact Manager is an application that allows users to manage their contacts efficiently. It provides functionalities for adding, updating, deleting, and finding contacts. Users can securely access their contacts through authentication using JSON Web Tokens (JWT).

## Features

- **User Authentication**: Users can authenticate using JSON Web Tokens, ensuring secure access to their contacts.
- **CRUD Operations**: Users can perform CRUD (Create, Read, Update, Delete) operations on their contacts.
- **Privacy**: Multiple users can use the application without privacy concerns, as each user can only access their own contacts.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js, used to build the RESTful API.
- **MongoDB**: NoSQL database used to store contact information.
- **JSON Web Tokens (JWT)**: Used for user authentication and authorization.
- **Thunder Client**: API testing tool used to test the RESTful API endpoints.

## Installation

1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/your-username/contact-manager-backend.git
    ```

2. **Install Dependencies**:
    ```bash
    cd contact-manager-backend
    npm install
    ```

3. **Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```
        PORT=3000
        MONGODB_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        ```

4. **Start the Server**:
    ```bash
    npm start
    ```

## API Endpoints

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login and generate a JWT token.
- **GET  /api/contacts**: Get all contacts of the authenticated user.
- **GET /api/contacts/:id**: Get a specific contact by ID.
- **POST /api/contacts**: Add a new contact.
- **PUT /api/contacts/:id**: Update an existing contact by ID.
- **DELETE /api/contacts/:id**: Delete a contact by ID.

## Testing

Use Thunder Client or any other API testing tool to test the API endpoints. Ensure that you are authenticated and have a valid JWT token to access protected routes.

