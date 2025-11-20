# 📝 Blogging Web Application

A full-stack blogging platform built with **React**, **Vite**, **Tailwind CSS V4**, **TypeScript** on the frontend and **Strapi** on the backend.

---

##  Features

### Frontend (React + Vite + TypeScript)
-  **Responsive Design** - Mobile-first approach with Tailwind CSS v3
-  **Blog Listing** - Display all published blog posts
-  **Blog Details** - Read full blog posts with rich content
-  **Search & Filter** - Filter posts by category and tags
-  **Author Profiles** - View author information and their posts
-  **Comments System** - Users can leave comments on posts
-  **User Authentication** - JWT-based login/registration
-  **Responsive Images** - Optimized media handling
-  **SEO Ready** - Meta tags and SEO descriptions
-  **Type Safety** - Full TypeScript support

### Backend (Strapi)
-  **Content Management** - Easy-to-use admin panel
-  **Rich Text Editor** - Create formatted blog content
-  **Media Management** - Upload and manage images
-  **Role-Based Permissions** - Public, Authenticated, Admin roles
-  **Draft & Publish** - Schedule and manage post publishing
-  **JWT Authentication** - Secure API endpoints
-  **Custom Filtering** - Filter posts by category, tags, search
-  **Comments Management** - Moderate user comments
-  **SEO Fields** - Optimize content for search engines

---

##  Tech Stack

### Frontend
```
React 19
Vite (Fast build tool)
TypeScript (Type safety)
Tailwind CSS v4 (Utility-first styling)
Axios / Fetch API (HTTP client)
React Router (Navigation)
```

### Backend
```
Strapi v4 (Headless CMS)
Node.js
SQLite / PostgreSQL (Database)
JWT Authentication
```

---

##  Folder Structure

```
blogging-app/
├── blog-frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogDetail.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   └── AuthForms.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   ├── AuthorPage.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useFetch.ts
│   │   │   └── usePost.ts
│   │   ├── services/           # API service functions
│   │   │   ├── api.ts
│   │   │   ├── postService.ts
│   │   │   ├── authService.ts
│   │   │   └── commentService.ts
│   │   ├── types/              # TypeScript interfaces
│   │   │   ├── post.ts
│   │   │   ├── user.ts
│   │   │   ├── comment.ts
│   │   │   └── auth.ts
│   │   ├── styles/             # Tailwind CSS + custom styles
│   │   │   └── globals.css
│   │   ├── utils/              # Helper functions
│   │   │   ├── formatDate.ts
│   │   │   ├── slugify.ts
│   │   │   └── validators.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/                 # Static assets
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── blog-backend/                    # Strapi CMS
    ├── src/
    │   ├── api/               # API endpoints
    │   │   ├── post/          # Blog post endpoints
    │   │   ├── category/      # Category endpoints
    │   │   ├── tag/           # Tag endpoints
    │   │   ├── author/        # Author endpoints
    │   │   └── comment/       # Comment endpoints
    │   ├── extensions/        # Strapi extensions
    │   └── index.js
    ├── config/
    │   ├── database.js        # Database configuration
    │   ├── server.js          # Server configuration
    │   └── admin.js           # Admin panel config
    ├── .env.example
    ├── package.json
    └── README.md
```

---

##  Installation & Setup

### Prerequisites
- Node.js
- npm 
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/kavitasoren02/BLOGAPP-Strapi.git
cd BLOGAPP-Strapi
```

### 2. Setup Backend (Strapi)

```bash
cd blo-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Setup Strapi (this will run migrations and create admin user)
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

### 3. Setup Frontend (React + Vite)

```bash
cd blog-frontend

# Install dependencies
npm install

# Create .env file for API configuration
cat > .env.local << EOF
VITE_API_URL=http://localhost:1337/api
VITE_API_BASE_URL=http://localhost:1337


# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

##  API Endpoints

### Posts
```
GET    /api/posts                          # Get all posts
GET    /api/posts?sort=publishedAt:desc   # Get latest posts
GET    /api/posts?filters[slug][$eq]=slug # Get post by slug
GET    /api/posts?filters[category][slug][$eq]=category-slug  # By category
GET    /api/posts?filters[tags][slug][$eq]=tag-slug           # By tag
POST   /api/posts                          # Create post (Admin)
PUT    /api/posts/:id                      # Update post (Admin)
DELETE /api/posts/:id                      # Delete post (Admin)
```

### Categories
```
GET    /api/categories                     # Get all categories
GET    /api/categories/:id                 # Get category by ID
```

### Tags
```
GET    /api/tags                           # Get all tags
GET    /api/tags/:id                       # Get tag by ID
```

### Authors
```
GET    /api/authors                        # Get all authors
GET    /api/authors/:id                    # Get author by ID
```

### Comments
```
GET    /api/comments?filters[post][:eq]=postId  # Get comments for post
POST   /api/comments                       # Create comment (Authenticated)
PUT    /api/comments/:id                   # Update comment
DELETE /api/comments/:id                   # Delete comment
```

### Authentication
```
POST   /api/auth/local/register            # User registration
POST   /api/auth/local                     # User login
GET    /api/users/me                       # Get current user (Authenticated)
```

---

##  Authentication

### User Registration
```bash
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### User Login
```bash
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "john@example.com",
    "password": "securepassword123"
  }'
```

### Using JWT Token in Frontend
Store the JWT token in localStorage after login and include it in API requests:

```typescript
const token = localStorage.getItem('jwt_token');
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

---

##  Package Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

### Backend
```bash
npm run develop  # Start Strapi in development mode
npm run build    # Build Strapi for production
npm start        # Start Strapi in production
npm run strapi   # Access Strapi CLI
```

---

##  Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:1337/api
VITE_API_BASE_URL=http://localhost:1337
VITE_APP_NAME=Blogging App
```

### Backend (.env)
```
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your-jwt-secret-key
ADMIN_JWT_SECRET=your-admin-jwt-secret-key
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=key1,key2,key3
```

---

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy Backend

#### Option 1: Render.com
1. Push backend to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Use PostgreSQL database
5. Deploy

# Deploy
git push origin main
```

---






