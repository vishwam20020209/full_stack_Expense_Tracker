# 💰 Finomo - Expense Tracker

A modern, full-stack expense tracking application built with **Spring Boot** and **React**. Track your spending, filter by categories, and gain insights into your finances.

![Tech Stack](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=springboot)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)

---

## ✨ Features

- **Add Expenses** - Log expenses with description, amount, category, and date
- **Smart Filtering** - Filter expenses by category
- **Sorting** - Sort by date or amount (ascending/descending)
- **Real-time Stats** - View total spending, expense count, and category summaries
- **Idempotency Support** - Safe retries with duplicate detection
- **Toast Notifications** - User-friendly feedback for all actions
- **Responsive Design** - Works seamlessly on desktop and mobile

---

## 🏗️ Architecture

```
Finomo/
├── backend/                 # Spring Boot REST API
│   └── src/main/java/com/finomo/expense/
│       ├── config/          # CORS and web configuration
│       ├── controller/      # REST endpoints
│       ├── dto/             # Data transfer objects
│       ├── exception/       # Global exception handling
│       ├── model/           # JPA entities
│       ├── repository/      # Data access layer
│       └── service/         # Business logic
│
└── frontend/                # React + Vite SPA
    └── src/
        ├── api/             # API client functions
        ├── components/      # React components
        ├── hooks/           # Custom React hooks
        └── assets/          # Static assets
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Spring Boot 3.x** | REST API framework |
| **Spring Data JPA** | Data persistence |
| **H2 Database** | In-memory DB (development) |
| **PostgreSQL** | Production database |
| **Maven** | Build & dependency management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Vanilla CSS** | Styling |
| **Fetch API** | HTTP client |

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** - [Download](https://adoptium.net/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Maven 3.8+** (or use included wrapper)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Finomo.git
cd Finomo
```

### 2. Start the Backend

```bash
cd backend

# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or with Maven installed
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### 3. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/expenses` | Get all expenses (with optional filtering) |
| `POST` | `/api/expenses` | Create a new expense |
| `GET` | `/api/expenses/categories` | Get all distinct categories |

### Query Parameters for GET /api/expenses

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category name |
| `sort` | string | Sort order: `date_desc`, `date_asc`, `amount_desc`, `amount_asc` |

### Create Expense Request Body

```json
{
  "description": "Coffee at Starbucks",
  "amount": 5.50,
  "category": "Food & Dining",
  "date": "2026-01-19",
  "idempotencyKey": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## ⚙️ Configuration

### Backend Configuration

Located in `backend/src/main/resources/application.properties`:

```properties
# Server port
server.port=8080

# H2 Console (development)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Database URL
spring.datasource.url=jdbc:h2:mem:expensedb
```

### Production Database (PostgreSQL)

Set environment variables:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/expensedb
export SPRING_DATASOURCE_USERNAME=your_user
export SPRING_DATASOURCE_PASSWORD=your_password
export SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
```

### Frontend Configuration

Create `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 🔐 Key Design Decisions

### Idempotency
Each expense creation request includes an `idempotencyKey`. This ensures:
- Safe retries on network failures
- No duplicate expenses even with multiple submissions
- Data integrity maintained

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (alternative frontend port)

### Error Handling
- Global exception handler provides consistent error responses
- Frontend displays user-friendly toast notifications
- Graceful degradation on API failures

---

## 🧪 Development

### Access H2 Console

While the backend is running, access the database console at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:expensedb`
- Username: `sa`
- Password: *(leave empty)*

### Build for Production

**Backend:**
```bash
cd backend
./mvnw clean package
java -jar target/expense-tracker-*.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📂 Project Components

### Frontend Components

| Component | Description |
|-----------|-------------|
| `ExpenseForm` | Form for adding new expenses |
| `ExpenseList` | Displays list of expenses |
| `FilterControls` | Category filter and sort options |
| `StatsDisplay` | Shows spending statistics |
| `Toast` | Notification system |

### Custom Hooks

| Hook | Description |
|------|-------------|
| `useExpenses` | Manages expense state, filtering, and API calls |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for better financial tracking
</p>
