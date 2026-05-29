<img width="1603" height="842" alt="Screenshot 2026-05-29 162000" src="https://github.com/user-attachments/assets/458d1aa4-890b-4c9a-af4c-9f8400f3dc34" />


# 🗺️ Career Roadmap Generator — Margdarshak AI

> A full-stack web application that generates personalized, step-by-step career roadmaps based on a user's current skills, target role, and experience level. Built as part of the Margdarshak AI Full Stack Developer Intern assignment.

🔗 **Live Demo:** [https://assignment-by-margdarshak-ai-1.onrender.com](https://assignment-by-margdarshak-ai-1.onrender.com)

---
<img width="1562" height="732" alt="Screenshot 2026-05-29 162135" src="https://github.com/user-attachments/assets/91ae6890-1f0f-4a83-955c-d62a1d40b84c" />
## 📸 Preview

| Dashboard | History |
|-----------|---------|
| Generate a roadmap with role, skills & experience level | View, open, and delete past roadmaps |

---

<img width="1588" height="842" alt="Screenshot 2026-05-29 162100" src="https://github.com/user-attachments/assets/768a38c0-65fb-4fc8-9583-0ed5ec4f2293" />
<img width="1566" height="661" alt="Screenshot 2026-05-29 162212" src="https://github.com/user-attachments/assets/88f0c441-53db-428e-a66f-0fa8f07c36a7" />

## ✨ Features

- **Roadmap Generator** — Enter a target role, current skills, and experience level to instantly receive a structured career roadmap
- **Persistent History** — Every generated roadmap is saved to the database with its creation timestamp
- **Roadmap History Page** — Browse, view details of, and delete any previously generated roadmap
- **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS
- **REST API** — Simple, well-defined API endpoints for all roadmap operations

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework with SSR/CSR, file-based routing, and API-friendly architecture |
| **Tailwind CSS** | Utility-first CSS for fast, consistent styling |
| **React Hooks** | `useState`, `useEffect` for local state and data fetching |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express.js** | Lightweight REST API framework |
| **Mongoose** | ODM (Object Document Mapper) for MongoDB — schema validation and queries |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL document store for persisting roadmap records |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Render** | Cloud platform used for full-stack deployment |

---

## 🏗️ Project Structure

```
career-roadmap-generator/
│
├── frontend/                        # Next.js application
│   ├── app/
│   │   ├── layout.js                # Root layout (navbar, metadata)
│   │   ├── page.js                  # Dashboard — roadmap generation form
│   │   └── history/
│   │       └── page.js              # Roadmap history page
│   ├── components/
│   │   ├── Navbar.jsx               # Top navigation (Dashboard / History)
│   │   └── RoadmapCard.jsx          # Card component for history items
│   ├── public/                      # Static assets
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                         # Express.js API server
│   ├── models/
│   │   └── Roadmap.js               # Mongoose schema/model for roadmap docs
│   ├── routes/
│   │   └── roadmap.js               # Route handlers for all /roadmap endpoints
│   ├── controllers/
│   │   └── roadmapController.js     # Business logic — roadmap generation & CRUD
│   ├── config/
│   │   └── db.js                    # MongoDB connection via Mongoose
│   ├── index.js                     # Express app entry point
│   └── .env                         # Environment variables (not committed)
│
└── README.md
```

---

## 🔌 API Reference

### Base URL
```
https://assignment-by-margdarshak-ai-1.onrender.com/api
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/roadmap/generate` | Generate and save a new roadmap |
| `GET` | `/roadmaps` | Fetch all saved roadmaps |
| `DELETE` | `/roadmap/:id` | Delete a roadmap by ID |

---

### `POST /roadmap/generate`

**Request Body:**
```json
{
  "targetRole": "Full Stack Developer",
  "currentSkills": "HTML, CSS, JavaScript",
  "experienceLevel": "beginner"
}
```

**Response:**
```json
{
  "_id": "664f...",
  "targetRole": "Full Stack Developer",
  "currentSkills": "HTML, CSS, JavaScript",
  "experienceLevel": "beginner",
  "roadmap": [
    "1. Learn HTML/CSS",
    "2. Learn JavaScript",
    "3. Learn React/Next.js",
    "4. Learn Backend APIs",
    "5. Build Projects",
    "6. Learn Deployment"
  ],
  "createdAt": "2026-05-29T10:00:00.000Z"
}
```

### `GET /roadmaps`

Returns an array of all saved roadmap documents, sorted by creation date (newest first).

### `DELETE /roadmap/:id`

Deletes the roadmap document with the given MongoDB `_id`. Returns a success message on deletion.

---

## 🧬 Data Flow — How It Works

```
User fills form (Role + Skills + Experience)
        │
        ▼
[Next.js Frontend] — POST /roadmap/generate ──►  [Express Backend]
                                                        │
                                                  Roadmap generation logic
                                                  (structured steps based on role)
                                                        │
                                                   [MongoDB]
                                                  Saves roadmap doc
                                                        │
                                                  Returns saved document
        ◄──────────────────────────────────────────────┘
[Frontend displays roadmap]

User visits /history
        │
        ▼
[Next.js Frontend] — GET /roadmaps ──►  [Express Backend]
                                               │
                                          [MongoDB] — finds all docs
                                               │
                                        Returns array of roadmaps
        ◄──────────────────────────────────────┘
[Frontend renders roadmap history cards]
```

---

## ⚙️ Local Setup

### Prerequisites

- Node.js v18+
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/career-roadmap-generator.git
cd career-roadmap-generator
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roadmap-db
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 🚀 Deployment

This project is deployed on **Render**.

- The **backend** is deployed as a Web Service (Node/Express).
- The **frontend** is deployed as a Static Site or Web Service (Next.js).
- MongoDB is hosted on **MongoDB Atlas**.

Environment variables (`MONGO_URI`, `NEXT_PUBLIC_API_URL`) are configured in the Render dashboard under each service's settings.

---

## 📋 Assignment Requirements Checklist

| Requirement | Status |
|---|---|
| Next.js frontend | ✅ |
| Node.js + Express backend | ✅ |
| MongoDB database | ✅ |
| Tailwind CSS styling | ✅ |
| `POST /roadmap/generate` endpoint | ✅ |
| `GET /roadmaps` endpoint | ✅ |
| `DELETE /roadmap/:id` endpoint | ✅ |
| Save roadmap with timestamp | ✅ |
| View roadmap history | ✅ |
| Delete roadmap | ✅ |
| Deployed live link | ✅ |

---

## 👤 Author

Built for the **Margdarshak AI — Full Stack Developer Intern** assignment.

- **Live App:** [https://assignment-by-margdarshak-ai-1.onrender.com](https://assignment-by-margdarshak-ai-1.onrender.com)
- **GitHub:** [your-username](https://github.com/your-username)
