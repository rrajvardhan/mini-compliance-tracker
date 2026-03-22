# Mini Compliance Tracker

A small web app to track compliance tasks for clients. Built as part of an internship assignment.

## Live Demo
🔗 https://mini-compliance-tracker-one.vercel.app

## Overview
<img width="1914" height="1036" alt="image" src="https://github.com/user-attachments/assets/4330ef91-cb23-4d17-9eae-5736faa6c00c" />


## Features
- View and select clients
- View, add, and update tasks per client
- Filter tasks by status and category
- Overdue tasks are clearly highlighted
- Shows basic stats — total, pending, and overdue count

## Tech Stack
- **Next.js** — for both frontend and backend (API routes)
- **MongoDB** — to store clients and tasks
- **Tailwind CSS** — for styling
- **Vercel** — for deployment

## Getting Started

1. Clone the repo
```bash
   git clone https://github.com/rrajvardhan/mini-compliance-tracker
   cd mini-compliance-tracker
```

2. Install dependencies
```bash
   npm install
```

3. Add a `.env.local` file:
```
   MONGO_URI=your_mongodb_connection_string
```

4. Start the dev server:
```bash
   npm run dev
```

5. Open http://localhost:3000 , this may vary

## Assumptions and Tradeoffs
- Adding/editing clients is out of scope for this version
- No login system 
- Entity types are fixed (individual, partnership, NGO)
- A task is tied to one client only
- A task is "overdue" if the due date has passed and it's still Pending or In Progress
- Used lightweight API route handling with direct MongoDB queries instead of a formal schema/model layer.
