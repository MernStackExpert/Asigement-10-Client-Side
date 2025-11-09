# FinEase - Personal Finance Manager

FinEase is a modern and responsive web application designed to help users manage their personal income and expenses. Users can register, log in, and track all their financial transactions through a clean dashboard. The application also provides insightful charts and reports to visualize financial data effectively.

### [Live Site URL](https://fineaseasigement.netlify.app/)

---

## 🚀 Key Features

* **Full Authentication:** Secure JWT (JSON Web Token) based API authentication with Email/Password and Google Sign-in options via Firebase.
* **Transaction CRUD:** Full CRUD (Create, Read, Update, Delete) operations for managing both Income and Expenses.
* **Dynamic Dashboard & Reports:** A real-time financial overview on the Home Page (Current Balance, Total Income, Total Expense) and a detailed Reports Page using Recharts (category-based Pie Chart and monthly Bar Chart).
* **Filtering and Sorting:** Users can filter reports by month or category and sort their transaction list by date or amount on the server-side.
*  **UI/UX:** Features a smooth Light/Dark mode toggle and engaging page transitions and card list animations powered by Framer Motion.
* **Protected Routes:** Secure private routes (like 'My Transactions', 'Reports') that automatically redirect unauthenticated users to the Login page.

---

## 🛠️ Technology Stack

### Client-Side

* **UI Framework:** React.js
* **Routing:** React Router
* **Styling:** Tailwind CSS, DaisyUI
* **Animation:** Framer Motion
* **State Management:** React Context API
* **Data Fetching:** Axios (with Custom Hook)
* **Charts:** Recharts
* **Notifications:** React Toastify, SweetAlert2
* **Icons:** React Icons

### Server-Side

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (MongoDB Atlas)
* **Security:** JWT (JSON Web Token), CORS

### Authentication

* Firebase Authentication (Email/Password & Google)

### Deployment

* **Client:** Netlify
* **Server:** Vercel