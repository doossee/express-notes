# Notes API - REST API for Managing Notes

A RESTful API built with Node.js, Express, and TypeScript for managing notes with CRUD operations, validation, pagination, and search functionality.

## Features

✅ **CRUD Operations** - Create, Read, Update, Delete notes
✅ **TypeScript** - Type-safe codebase with strict mode
✅ **Validation** - Request validation
✅ **Error Handling** - Centralized async error handling
✅ **Pagination** - Efficient data retrieval with page/limit
✅ **Search** - Keyword search in title and content
✅ **RESTful Design** - Follows REST conventions and best practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Storage**: In-memory (Map)

## Project Structure

```
src/
├── server.ts              # Entry point and Express setup
├── models/
│   └── note.ts           # Data model and in-memory storage
├── controllers/
│   └── noteController.ts # Business logic
├── routes/
│   └── noteRoutes.ts     # Route definitions
├── middleware/
│   ├── errorHandler.ts   # Error handling middleware
│   └── validateRequest.ts # Validation middleware
├── utils/
│   └── ApiError.ts       # Custom error class
└── types/
    └── index.ts          # TypeScript type definitions
```

## Installation

```bash
# Clone repository
git clone git https://github.com/doossee/express-notes
cd express-notes

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## Usage

```bash
# Development mode with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Production mode
npm start
```

## API Endpoints

### Base URL

```
http://localhost:3000/notes
```

### 1. Create Note

**POST** `/notes`

Request body:

```json
{
  "title": "My Note Title",
  "content": "This is the note content"
}
```

Response (201):

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "My Note Title",
    "content": "This is the note content",
    "createdAt": "2024-12-25T10:00:00.000Z",
    "updatedAt": "2024-12-25T10:00:00.000Z"
  }
}
```

### 2. List Notes

**GET** `/notes?page=1&limit=10&search=keyword`

Query parameters:

- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10, max 100
- `search` (optional): Search keyword

Response (200):

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 3. Get Note by ID

**GET** `/notes/:id`

Response (200):

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "My Note Title",
    "content": "This is the note content",
    "createdAt": "2024-12-25T10:00:00.000Z",
    "updatedAt": "2024-12-25T10:00:00.000Z"
  }
}
```

### 4. Update Note

**PUT** `/notes/:id`

Request body (at least one field required):

```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

Response (200):

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Updated Title",
    "content": "Updated content"
    "createdAt": "2024-12-25T10:00:00.000Z",
    "updatedAt": "2024-12-25T10:00:00.000Z"
  }
}
```

### 5. Delete Note

**DELETE** `/notes/:id`

Response (200):

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Updated Title",
    "content": "Updated content"
    "createdAt": "2024-12-25T10:00:00.000Z",
    "updatedAt": "2024-12-25T10:00:00.000Z"
  }
}

## Error Responses

All errors return JSON with this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

Status codes:

- `400` - Bad Request (validation failed)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Testing with cURL

```bash
# Create note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Test content"}'

# Get all notes
curl http://localhost:3000/notes

# Get with pagination and search
curl "http://localhost:3000/notes?page=1&limit=5&search=test"

# Get by ID
curl http://localhost:3000/notes/<note-id>

# Update note
curl -X PUT http://localhost:3000/notes/<note-id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete note
curl -X DELETE http://localhost:3000/notes/<note-id>
```

## Development Decisions

### Why Map over Array?

- O(1) lookup by ID instead of O(n)
- Better performance for frequent reads
- Natural key-value storage

### Why singleton pattern?

- Single source of truth for in-memory data
- Consistent state across all routes
- Simpler dependency management

### Error handling approach

- Custom ApiError class with status codes
- Centralized error handler middleware
- Async wrapper to catch promise rejections
- Operational vs programming error distinction

## Performance Considerations

### Where this breaks under load:

1. **In-memory storage** - No persistence, limited by RAM
2. **Single-threaded** - CPU-bound operations block event loop
3. **No caching** - Every request hits model directly
4. **Sequential processing** - One request at a time per connection

### Solutions for production:

- Database (PostgreSQL/MongoDB) for persistence
- Redis for caching
- Cluster mode or PM2 for multi-core usage
- Rate limiting middleware
- Database connection pooling

## Future Improvements

- [ ] Add database (PostgreSQL with TypeORM/Prisma)
- [ ] Add authentication (JWT)
- [ ] Add unit and integration tests (Jest)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add logging (Winston/Pino)
- [ ] Add rate limiting
- [ ] Add Docker containerization
- [ ] Add CI/CD pipeline
