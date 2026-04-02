# Zorvyn Finance Dashboard

A clean, responsive, and interactive financial dashboard built as a technical assignment for the Frontend Developer Intern role.

## 🚀 Live Demo
**[Click here to view the Live Vercel Demo](https://zorvyn-dashboard-shekhar.vercel.app)**

## 🛠️ Tech Stack & Architecture
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS
* **State Management:** React Context API + Local Storage Persistence
* **Data Visualization:** Recharts
* **Icons:** Lucide-React

## ✨ Core Features & Requirements Met

* **Dashboard Overview:** Displays calculated summary cards (Balance, Income, Expenses).
* **Time-Based Visualization:** Interactive Line Chart tracking balance trends over time.
* **Categorical Visualization:** Interactive Donut Chart breaking down expenses by category.
* **Data Insights:** Dynamic banner identifying the highest spending category automatically.
* **Transaction Engine:** * Full data table with Date, Description, Category, Amount, and Type.
  * Real-time search filtering (by description or category).
  * Type filtering (All, Income only, Expense only).
* **Role-Based Access Control (RBAC):** * **Viewer Mode:** Can only view data and use filters.
  * **Admin Mode:** Unlocks the UI to Add new transactions and Delete existing ones.
* **Data Persistence:** Transactions are synchronized with browser `localStorage`, ensuring changes persist across page reloads.

## 🧠 Technical Decisions & Trade-offs
1. **Next.js over standard React:** Selected for superior built-in routing, out-of-the-box TypeScript configuration, and lightning-fast Vercel deployment.
2. **Context API over Redux:** For an application of this scope, Redux introduces unnecessary boilerplate. Context provides a clean, native solution for managing global UI state (like the Viewer/Admin toggle) without performance hits.
3. **Pure Functional Reductions:** All chart data transformations are handled via purely functional `.reduce()` methods wrapped in `useMemo` hooks. This ensures Next.js 15 strict compiler compatibility and prevents unnecessary re-renders.

## 💻 Running Locally

Clone the repository and install dependencies:

```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/zorvyn-dashboard.git](https://github.com/YOUR_GITHUB_USERNAME/zorvyn-dashboard.git)
cd zorvyn-dashboard
npm install
npm run dev
