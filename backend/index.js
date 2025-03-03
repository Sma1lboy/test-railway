/*
  Write a Cool Personal Website – Backend Codebase (index.js)
  -----------------------------------------------------------
  This file sets up an Express server with ES Module syntax, connects to an SQLite database,
  initializes the database schema from "schema.sql", and provides RESTful API endpoints for:
  - User Profiles (/api/users)
  - Blog Posts (/api/posts) – with JWT authentication for creating posts
  - Comments (/api/posts/:id/comments)
  - Contact submissions (/api/contact)
  
  Environment variables (using dotenv):
    - PORT: The port the server listens on (default: 3000)
    - DB_FILE: Path to the SQLite database file (default: ./database.sqlite)
    - JWT_SECRET: Secret key for verifying JSON Web Tokens (default: "secret")
  
  Dependencies:
    - express
    - cors
    - sqlite3
    - jsonwebtoken
    - dotenv
    - fs and path (built-in)
*/

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration values
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DB_FILE || './database.sqlite';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Initialize SQLite database connection
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Enable foreign key constraints
db.exec("PRAGMA foreign_keys = ON;", (err) => {
  if(err) {
    console.error("Error enabling foreign key constraints:", err);
  } else {
    console.log("Foreign key constraints enabled.");
  }
});

// Initialize Database Schema from schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
fs.readFile(schemaPath, 'utf-8', (err, sqlCommands) => {
  if (err) {
    console.error("Error reading schema.sql:", err);
  } else {
    db.exec(sqlCommands, (err) => {
      if (err) {
        console.error("Error executing schema.sql:", err);
      } else {
        console.log("Database schema initialized.");
      }
    });
  }
});

// Create Express application and configure middleware
const app = express();
app.use(express.json()); // JSON parsing middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing

// --------------------- Helper Middleware -------------------------

// Authentication middleware (for endpoints that require auth)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ errors: { message: "Missing Authorization header" }, success: {} });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ errors: { message: "Token missing" }, success: {} });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ errors: { message: "Invalid token" }, success: {} });
    }
    req.user = user;  // Attach decoded token payload if needed
    next();
  });
}

// --------------------- API Routes -------------------------

// User Profile Endpoints

// GET /api/users - Retrieve all user profiles
app.get('/api/users', (req, res, next) => {
  const sql = 'SELECT * FROM UserProfile';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error retrieving users:", err.message);
      return next(err);
    }
    res.json({ success: { users: rows }, errors: {} });
  });
});

// GET /api/users/:id - Retrieve a specific user profile by UserID
app.get('/api/users/:id', (req, res, next) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM UserProfile WHERE UserID = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error retrieving user:", err.message);
      return next(err);
    }
    if (!row) {
      return res.status(404).json({ errors: { message: "User not found" }, success: {} });
    }
    res.json({ success: { user: row }, errors: {} });
  });
});

// Blog Post Endpoints

// GET /api/posts - Retrieve all blog posts
app.get('/api/posts', (req, res, next) => {
  const sql = 'SELECT * FROM BlogPost';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching posts:", err.message);
      return next(err);
    }
    res.json({ success: { posts: rows }, errors: {} });
  });
});

// GET /api/posts/:id - Retrieve detailed information for a specific blog post
app.get('/api/posts/:id', (req, res, next) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM BlogPost WHERE PostID = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching post:", err.message);
      return next(err);
    }
    if (!row) {
      return res.status(404).json({ errors: { message: "Post not found" }, success: {} });
    }
    res.json({ success: { post: row }, errors: {} });
  });
});

// POST /api/posts - Create a new blog post (Authenticated endpoint)
app.post('/api/posts', authenticateToken, (req, res, next) => {
  const { Title, Description, Content, Image } = req.body;
  if (!Title || !Description || !Content) {
    return res.status(400).json({ errors: { message: "Title, Description, and Content are required" }, success: {} });
  }
  const sql = 'INSERT INTO BlogPost (Title, Description, Content, Image) VALUES (?, ?, ?, ?)';
  const params = [Title, Description, Content, Image || null];
  db.run(sql, params, function(err) {
    if (err) {
      console.error("Error creating post:", err.message);
      return next(err);
    }
    // Retrieve the newly created blog post using the generated PostID
    const newPostId = this.lastID;
    const selectSql = 'SELECT * FROM BlogPost WHERE PostID = ?';
    db.get(selectSql, [newPostId], (err, row) => {
      if (err) {
        console.error("Error retrieving new post:", err.message);
        return next(err);
      }
      res.status(201).json({ success: { post: row }, errors: {} });
    });
  });
});

// Comment Endpoints

// GET /api/posts/:id/comments - Retrieve comments for a specific blog post
app.get('/api/posts/:id/comments', (req, res, next) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Comment WHERE PostID = ?';
  db.all(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error retrieving comments:", err.message);
      return next(err);
    }
    res.json({ success: { comments: rows }, errors: {} });
  });
});

// POST /api/posts/:id/comments - Add a comment to a specific blog post
app.post('/api/posts/:id/comments', (req, res, next) => {
  const { id } = req.params;
  const { UserID, Content } = req.body;
  if (!UserID || !Content) {
    return res.status(400).json({ errors: { message: "UserID and Content are required" }, success: {} });
  }
  const sql = 'INSERT INTO Comment (PostID, UserID, Content) VALUES (?, ?, ?)';
  const params = [id, UserID, Content];
  db.run(sql, params, function(err) {
    if (err) {
      console.error("Error adding comment:", err.message);
      return next(err);
    }
    const newCommentId = this.lastID;
    const selectSql = 'SELECT * FROM Comment WHERE CommentID = ?';
    db.get(selectSql, [newCommentId], (err, row) => {
      if (err) {
        console.error("Error retrieving comment:", err.message);
        return next(err);
      }
      res.status(201).json({ success: { comment: row }, errors: {} });
    });
  });
});

// Contact Endpoint

// POST /api/contact - Submit a contact form message
app.post('/api/contact', (req, res, next) => {
  const { Name, Email, Message } = req.body;
  if (!Name || !Email || !Message) {
    return res.status(400).json({ errors: { message: "Name, Email, and Message are required" }, success: {} });
  }
  // Simulate contact message processing (e.g., log or send email)
  console.log(`Contact message received from ${Name} (${Email}): ${Message}`);
  res.json({ success: { message: "Your message has been sent successfully." }, errors: {} });
});

// --------------------- Centralized Error Handling -------------------------

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ errors: { message: "Internal Server Error" }, success: {} });
});

// --------------------- Start Server -------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});