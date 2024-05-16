# Sentiment Analysis Server 🚀

A backend server application that integrates sentiment analysis with secure file handling using Express.js and MongoDB. 

## Features

- **Machine Learning Model Integration**: Integrates a pre-trained sentiment analysis machine learning model using VaderSentimentAnalysis with the server. 🤖
- **Secure File Handling**: Implements API endpoints for file uploads (audio, video, PDFs) and securely stores them in MongoDB. 🔒
- **Authentication System**: Develops a robust authentication system using Passport.js for user registration, login, and logout functionality. 🔐

## Architecture

The application follows the MVC (Model-View-Controller) pattern for a modular and maintainable structure.

- **Models**: Define the schemas for User and File. 📝
- **Controllers**: Handle the logic for authentication, sentiment analysis, and file handling. 💻
- **Routes**: Define the API endpoints for user authentication, sentiment analysis, and file upload/download. 🛣️
- **Middlewares**: Implement authentication middleware for secure access control. 🛡️

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

Request Payload:

```json
{
  "username": "example",
  "email": "example@example.com",
  "password": "password"
}
```

#### Login User

```http
POST /api/auth/login
```

Request Payload:

```json
{
  "email": "example@example.com",
  "password": "password"
}
```

Response Payload:

```json
{
  "token": "your_jwt_token"
}
```

### Sentiment Analysis

#### Analyze Sentiment

```http
POST /api/sentiment/analyze
```

Request Payload:

```json
{
  "text": "Your text for sentiment analysis"
}
```

Response Payload:

```json
{
  "sentiment": "positive",
  "intensity": {
    "neg": 0.0,
    "neu": 0.654,
    "pos": 0.346,
    "compound": 0.75
  }
}
```

### File Handling

#### Upload File

```http
POST /api/files/upload
```

Request Payload:

```formdata
file: (binary)
```

Response Payload:

```json
{
  "message": "File uploaded successfully"
}
```

#### Download File

```http
GET /api/files/:id
```

Response: File download

## Running the Application Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your/repository.git
   ```

2. Install dependencies:

   ```bash
   cd sentiment-analysis-server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Sample Code Snippets

### Machine Learning Model Integration

```javascript
const vader = require('vader-sentiment');

exports.analyzeSentiment = (req, res) => {
  // Implementation...
};
```

### File Upload Handling

```javascript
const multer = require('multer');
const File = require('../models/File');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (['audio/', 'video/', 'application/pdf'].some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
}).single('file');

exports.uploadFile = (req, res) => {
  // Implementation...
};
```

### Authentication System

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
  // Implementation...
};

exports.register = async (req, res) => {
  // Implementation...
};
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 📝
