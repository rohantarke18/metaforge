# 🚀 MetaForge

> **A Metadata-Driven Application Generator that transforms JSON configuration into fully functional web applications.**

---

<p align="center"> <img src="https://raw.githubusercontent.com/rohantarke18/metaforge/main/public/metaforge-banner.png" alt="MetaForge Banner" width="100%"> </p>

<h1 align="center">🚀 MetaForge</h1>

<p align="center"> <strong>Metadata-Driven AI Application Generator</strong> </p>

<p align="center"> Transform JSON configurations into fully functional web applications with dynamic UI rendering, CRUD APIs, live preview, and runtime validation. </p>

<p align="center">









</p>

## 📌 Overview

MetaForge is a full-stack low-code platform inspired by Base44.

Instead of manually writing frontend code, users define an application's structure using JSON metadata. The runtime engine dynamically renders pages, forms, dashboards, tables, and layouts while supporting CRUD operations through a PostgreSQL database.

---

## ✨ Features

### Dynamic Runtime

* JSON-driven application rendering
* Live Preview
* Runtime validation
* Graceful error handling
* Extensible component registry

### Frontend

* Dynamic Forms
* Dynamic Tables
* Dashboard Cards
* Responsive UI
* Loading States
* Error States

### Backend

* Dynamic CRUD APIs
* Prisma ORM
* Neon PostgreSQL
* Runtime Validation
* Configuration Storage

### Additional Features

* 📂 CSV Import
* 📥 JSON Export
* 🔔 Toast Notifications

---

## 🏗 Architecture

```
                JSON Configuration
                       │
                       ▼
                Runtime Engine
          (Parser + Validator)
                       │
                       ▼
             Component Registry
                       │
      ┌─────────┬─────────┬─────────┐
      ▼         ▼         ▼
    Cards     Tables     Forms
                       │
                       ▼
                CRUD API Layer
                       │
                       ▼
                 Prisma ORM
                       │
                       ▼
              Neon PostgreSQL
```

---

## ⚙️ Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* Lucide Icons

### Backend

* Next.js API Routes
* Prisma ORM
* Neon PostgreSQL

### Runtime

* JSON Parser
* Runtime Validator
* Dynamic Component Registry

### Utilities

* PapaParse
* Sonner Toasts

---

## 📂 Project Structure

```
app/
components/
data/
lib/
prisma/
public/
types/
```

---

## 🚀 Getting Started

```bash
git clone <repository-url>

npm install

npx prisma generate

npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🎯 How It Works

1. Create or import a JSON configuration.
2. The runtime validates the configuration.
3. Components are rendered dynamically.
4. Users preview the generated application instantly.
5. Save applications using CRUD APIs.
6. Store metadata in Neon PostgreSQL.
7. Export configurations as JSON.

---

## 📸 Screenshots

Add screenshots here:

* Home Page
* Live Preview
* My Applications
* CSV Import
* JSON Export

---

## 🔮 Future Improvements

* Google Authentication
* Multi-language Support
* Workflow Automation
* Dynamic Database Schema Generation
* GitHub Export
* PWA Support

---

## 👨‍💻 Author

**Rohan Tarke**

