# BudgetBasics — React (Vite + JavaScript)

Converted from the original multi-page static HTML/CSS/JS project to a single-page React app using **Vite** and **JavaScript**.

## Features

- **React Router** pages: Home, Learn, Practice, Infographics (Explore), Help, About, Feedback, Sitemap
- Shared **Header** (live Karachi clock, visitor counter, mobile menu)
- Shared **Footer** and floating **Budget Assistant** chatbot
- **Practice tools**: 50-30-20 calculator, Savings Goal Planner, Expense Planner (localStorage)
- **Learn**: modules, accordion mistakes, quick quiz
- **Infographics**: search, filter, sort
- Original **styles.css** + React-specific additions

## Setup

```bash
cd budget-basics-react
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Header, Footer, Chatbot, Layout
  pages/        Home, Learn, Practice, Infographics, Help, About, Feedback, Sitemap
  styles.css    Original + React extras
  App.jsx       Routes
  main.jsx      Entry
public/
  assets/       Team photos
  logo.jpeg
  chatbot-data.json
```

## Notes

- Visit counter and expense list use `localStorage` / `sessionStorage` (client-only).
- Chatbot answers load from `/chatbot-data.json`.
- Educational project only — not financial advice.
