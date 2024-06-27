Certainly! Below is a detailed `README.md` file for your forum-like application:

---

# IBSU Forum

IBSU Forum is a Reddit-like web application built using Node.js, Express, and MongoDB. It allows users to create topics, posts, and comments, and to vote on posts and comments.

## Features

- **User Registration and Authentication**: Users can register, login, and manage their profiles.
- **Topics Management**: Users can create and manage topics.
- **Post Management**: Users can create, read, update, and delete posts within topics.
- **Comment Management**: Users can comment on posts and manage their comments.
- **Voting System**: Users can upvote or downvote posts and comments.
- **Search and Pagination**: Users can search posts by title and body with pagination support.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman or any API testing tool (for testing the endpoints)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Lasha-Nikolaishvili/ibsu-forum.git
cd ibsu-forum
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/
SECRET_KEY=your_jwt_secret_key
```

4. Start the application:

```bash
npm start
```

5. The server will be running at `http://localhost:3000`.

### API Endpoints

#### User Endpoints

- **Register**: `POST /users/register`
  - Body: `{ "username": "string", "email": "string", "password": "string", "bio": "string", "avatar_url": "string", "permits": ["string"] }`
- **Login**: `POST /users/login`
  - Body: `{ "username": "string", "password": "string" }`
- **Profile**: `GET /users/:id`

#### Topic Endpoints

- **Create Topic**: `POST /topics` (Authenticated)
  - Body: `{ "name": "string", "description": "string", "moderators": ["userId"] }`
- **Get Topics**: `GET /topics`
- **Get Topic**: `GET /topics/:id`
- **Update Topic**: `PUT /topics/:id` (Authenticated, Moderator)
  - Body: `{ "name": "string", "description": "string", "moderators": ["userId"] }`
- **Delete Topic**: `DELETE /topics/:id` (Authenticated, Moderator)

#### Post Endpoints

- **Create Post**: `POST /posts` (Authenticated)
  - Body: `{ "title": "string", "body": "string", "topicId": "string" }`
- **Get Posts**: `GET /posts`
- **Get Post**: `GET /posts/:id`
- **Update Post**: `PUT /posts/:id` (Authenticated, Author)
  - Body: `{ "title": "string", "body": "string" }`
- **Delete Post**: `DELETE /posts/:id` (Authenticated, Author)
- **Search Posts**: `GET /posts/search?query=string&page=1&limit=10`

#### Comment Endpoints

- **Create Comment**: `POST /comments` (Authenticated)
  - Body: `{ "body": "string", "postId": "string", "parentCommentId": "string" (optional) }`
- **Get Comments**: `GET /comments/post/:postId`
- **Update Comment**: `PUT /comments/:id` (Authenticated, Author)
  - Body: `{ "body": "string" }`
- **Delete Comment**: `DELETE /comments/:id` (Authenticated, Author)

#### Voting Endpoints

- **Vote**: `POST /votes` (Authenticated)
  - Body: `{ "postId": "string" (optional), "commentId": "string" (optional), "vote_type": "upvote" | "downvote" }`

## Running Tests

You can use Postman or any API testing tool to test the endpoints. Make sure the server is running and the MongoDB database is connected.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
