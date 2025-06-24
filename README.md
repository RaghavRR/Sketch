# 🧠 Sketch — Collaborative Real-Time Teaching Whiteboard

**Sketch** is a real-time, collaborative whiteboard application built for online teaching and interactive sessions — inspired by tools like [Excalidraw](https://excalidraw.com/), but fully custom-built without using any external drawing libraries.

With Sketch, teachers can visually explain concepts using shapes, arrows, text, and freehand drawings in a virtual room that students can join via a unique room ID.

---

## 🚀 Features

- ✍️ **Real-Time Collaborative Drawing**  
  Draw with students in real-time using **WebSocket-powered canvas**.

- 🟢 **Custom Built Drawing Tools** (No Libraries!)  
  Includes: Circle, Rectangle, Pencil, Line, Arrow, Text, and Eraser —  
  All built from scratch using **canvas** and **physics-based logic**.

- 🔐 **Authentication System**  
  Includes full **Sign In / Sign Up** flow with secure sessions.

- 🧑‍🏫 **Create & Share Teaching Rooms**  
  Teachers can create unique rooms and share Room IDs with students.

- 🧑‍🎓 **Multi-User Participation**  
  Students can join the room simultaneously and see real-time updates.

- 🖼️ **Modern UI & Landing Page**  
  Clean and responsive landing page for a great first impression.

---

## 📸 Screenshots

Take a visual tour of the app 👇

### 🟣 1. Landing Page  
A clean, welcoming homepage to explain the app and encourage sign-up.

---<img width="903" alt="landing page" src="https://github.com/user-attachments/assets/c6d9388e-8a40-49f0-a057-38c9c75e1763" />


### 🔐 2. Sign In  
Secure login for returning users.

<img width="865" alt="signin" src="https://github.com/user-attachments/assets/93787f48-2ddd-4bd9-a1cf-868ad682aaaa" />

---

### 📝 3. Sign Up  
Quick registration with minimal fields.

<img width="817" alt="signup" src="https://github.com/user-attachments/assets/c6996b9b-d3e9-499c-b992-34fc42bf688a" />

---

### 🧑‍🏫 4. Dashboard  

Teachers can create a room and get a unique Room ID to share with students.

<img width="819" alt="dashbaord" src="https://github.com/user-attachments/assets/ef193e30-489d-4cd1-bbab-e7b85e7df61e" />

---

### ✍️ 5. Canvas
Fully interactive real-time drawing space with tools like:
- Pencil, Line, Arrow
- Rectangle, Circle
- Eraser, Text
- 
<img width="952" alt="canvas" src="https://github.com/user-attachments/assets/862b969e-1c6d-48b6-bf5a-9f45eb6ad789" />

---

> 🧠 All drawings are rendered using manually written physics-based DOM logic (not Canvas API), and updates sync live using WebSockets.




## 🧱 Tech Stack

| Area                | Tech                                             |
|---------------------|--------------------------------------------------|
| Framework           | **Next.js** (App Router)                         |
| Architecture        | **Turborepo Monorepo**                           |
| Backend             | **Prisma ORM** + **Neon Database**              |
| Real-time Comm      | **WebSockets**                                   |
| Frontend Drawing    | **Custom Physics-Based Logic (No Canvas API, No Libraries)** |
| Authentication      | **Custom Built** (No Auth0, Clerk, Firebase etc.)|
| Styling             | **Tailwind CSS** (assumed from UI)               |
| Package Manager     | **pnpm**                                         |
| Code Quality        | ESLint, Prettier, TypeScript                     |


## 🧪 Getting Started (Run Locally)

```bash
# 1. Clone the repository
git clone https://github.com/RaghavRR/Sketch.git
cd Sketch

# 2. Go inside each server folder and install dependencies

# HTTP Server Setup
cd apps/http-server
pnpm install
cp .env.example .env
# Fill in your DATABASE_URL and other required variables

# WebSocket Server Setup
cd apps/ws-server
pnpm install
cp .env.example .env
# Fill in WebSocket-related environment variables

# Frontend Setup
cd apps/sketch.io-frontend
pnpm install
cp .env.example .env

# 3. Run servers in separate terminals

# Terminal 1: Start HTTP server
cd apps/http-server
npm run dev

# Terminal 2: Start WebSocket server
cd apps/ws-server
npm run dev

# Terminal 3: Start Frontend
cd apps/ketch.io-frontend
npm run dev

# 4. Open your browser at http://localhost:3000
# Create a room, share the ID with students, and start teaching live!
