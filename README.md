# Smara

Smara is a web application designed to help users search, analyze, and export app data from the Google Play Store. It provides insights into app details, data safety, and other relevant metrics, making it a useful tool for researchers, developers, and analysts.

---

## 🚀 Features

- **Search Apps**: Search for apps using keywords or categories.
- **App Insights**: Fetch detailed app information including version, release date, content rating, and more.
- **Data Safety**: Retrieve data safety information for apps.
- **Export Data**: Export app data in CSV or JSON format for further analysis.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org)
- **UI Library**: [Chakra UI](https://chakra-ui.com)
- **State Management**: React Context API

### Backend

- **Framework**: [Express.js](https://expressjs.com)
- **APIs**:
  - [Google Play Scraper](https://github.com/facundoolano/google-play-scraper)
  - [OpenAI API](https://platform.openai.com/docs/)

---

## 📦 Installation

### Prerequisites

- Node.js v16 or higher
- npm, yarn, or pnpm

### 1. Clone the repository:

```bash
git clone https://github.com/EjMat8/SMARA.git
cd SMARA
```

### 2. Install dependencies for both frontend and backend:

```bash
# Frontend
cd client
npm install

# Backend
cd ../backend
npm install
```

### 3. Set up environment variables:

- Create a `.env` file in the `backend` directory.
- Add the following:

```env
OPENAI_API_KEY=your_openai_api_key
```

---

## ▶️ Running the Application

### 1. Start the backend server:

```bash
cd backend
node index.js
```

### 2. Start the frontend development server:

```bash
cd ../client
npm run dev
```

### 3. Open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

---

## 🗂 Project Structure

### Frontend (`client`)

- **Components**: Reusable UI components (`Search`, `Export`, `AppOverview`)
- **Pages**: Next.js pages for routing
- **Utils**: Helper functions and constants

### Backend (`backend`)

- **Routes**: API endpoints for fetching app data
- **Services**: Logic for interacting with external APIs
- **Middleware**: Error handling and CORS setup

---

## 📡 API Endpoints

- `GET /api/apps/search`: Search for apps by keyword or category
- `POST /api/apps/insights`: Fetch AI insights about app
- `POST /api/apps/datasafety`: Retrieve data safety info

---

## Notes

Still need to fix some error handling. But overall MVP is done.
