# מערכת ניהול משכנתאות - Mortgage Management System

A comprehensive mortgage management system with a modern web interface and robust backend API. The system enables efficient case management, document handling, and advisor-client communication for mortgage processing.

---

## 📋 Project Overview

**ProjectGitty** is a full-stack mortgage management application designed to streamline the mortgage lending process. The system serves three main user roles:
- **Clients**: Apply for mortgages, track case status, upload documents, and manage appointments
- **Advisors**: Manage client cases, process applications, schedule meetings, and provide recommendations
- **Admins**: Oversee system operations, manage banks, and monitor all cases

---

## 🏗️ Architecture

The project follows a layered architecture:

```
Frontend (mortgage-ui)          Backend (Project)
├── React 19                    ├── ASP.NET Core 8
├── TypeScript                  ├── JWT Authentication
├── Vite                        ├── Swagger/OpenAPI
└── TailwindCSS                 └── SQLite Database
                                    ├── Business Logic (BL)
                                    ├── Data Access Layer (DAL)
                                    └── API Controllers
```

---

## 🛠️ Tech Stack

### Frontend (`mortgage-ui/`)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: TailwindCSS 4
- **Form Management**: React Hook Form + Zod (validation)
- **UI Components**: Radix UI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Icons**: Lucide React

### Backend (`Project/`)
- **Framework**: ASP.NET Core 8
- **Language**: C#
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Architecture Layers**:
  - **Server**: Web API controllers and program configuration
  - **BL (Business Logic)**: Service implementations
  - **DAL (Data Access Layer)**: Database operations and models

---

## 📁 Project Structure

### Frontend Structure
```
mortgage-ui/
├── src/
│   ├── api/                 # API integration layer
│   │   ├── admin.api.ts
│   │   ├── advisor.api.ts
│   │   ├── auth.api.ts
│   │   ├── customer.api.ts
│   │   └── client.ts
│   ├── components/          # Reusable React components
│   │   ├── layout/
│   │   └── ui/
│   ├── features/            # Feature-based modules
│   │   ├── admin/
│   │   ├── advisor/
│   │   ├── auth/
│   │   └── customer/
│   ├── router/              # Route definitions & protection
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/
└── package.json
```

### Backend Structure
```
Project/
├── server/                  # ASP.NET Core API
│   ├── Controllers/
│   │   ├── Admin/
│   │   ├── Advisor/
│   │   ├── AuthController.cs
│   │   ├── CustomerAppointmentsController.cs
│   │   ├── CustomerCasesController.cs
│   │   ├── CustomerDocumentsController.cs
│   │   ├── CustomerMortgageController.cs
│   │   └── CustomerProfileController.cs
│   ├── Services/
│   ├── Program.cs
│   └── appsettings.json
├── BL/                     # Business Logic Layer
│   ├── Services/
│   │   ├── AdminServices/
│   │   ├── AdvisorServices/
│   │   └── CustomerServices/
│   ├── Models/
│   └── Api/
├── DAL/                    # Data Access Layer
│   ├── Services/
│   ├── Api/
│   ├── Models/
│   │   ├── Appointment.cs
│   │   ├── Bank.cs
│   │   ├── Case.cs
│   │   ├── Customer.cs
│   │   ├── Document.cs
│   │   ├── Mortgage.cs
│   │   ├── MortgageProgram.cs
│   │   ├── Payment.cs
│   │   └── User.cs
│   └── database/
└── Ui/
```

---

## 💾 Database Schema

The system uses 6 main tables:

### 1. Users (משתמשים)
- user_id, username, password, full_name, email, phone, address, id_number, user_type, created_date

### 2. Cases (תיקים)
- case_id, user_id, case_type, status, bank_id, property_address, loan_amount, monthly_income, created_date, last_updated, priority

### 3. Banks (בנקים)
- bank_id, bank_name, contact_person, phone, email, interest_rate_min, interest_rate_max, processing_time_days, requirements

### 4. Meetings (פגישות)
- meeting_id, case_id, meeting_date, meeting_type, location, notes, status

### 5. Documents (מסמכים)
- document_id, case_id, document_type, file_path, upload_date, status, required

### 6. Tasks (משימות)
- task_id, case_id, task_description, due_date, assigned_to, status, priority, created_date

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (for frontend)
- **.NET 8 SDK**: For backend development
- **Git**: For version control
- **Visual Studio Code** or **Visual Studio 2022**: Recommended IDEs

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ProjectGitty-SaraDina-Chani
```

#### 2. Frontend Setup

```bash
cd mortgage-ui
npm install
```

#### 3. Backend Setup

```bash
cd ../Project
# Restore NuGet packages
dotnet restore
```

---

## 💻 Development

### Running the Frontend

```bash
cd mortgage-ui
npm run dev
```
Frontend will be available at `http://localhost:5173`

Available npm scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Running the Backend

```bash
cd Project/server
dotnet run
```
API will be available at `https://localhost:7001` (or configured port)

#### Development Features:
- **Swagger UI**: Available at `/swagger` - test API endpoints
- **Hot Reload**: Enabled for quick development iteration
- **Database**: SQLite (auto-creates on first run)
- **Authentication**: JWT tokens in Authorization header

---

## 🔑 Key Features

### Client Features
- ✅ User registration and authentication
- ✅ Create and manage mortgage cases
- ✅ Upload required documents
- ✅ Schedule and manage appointments
- ✅ Track case status in real-time
- ✅ View recommended banks based on profile
- ✅ Manage payment schedules

### Advisor Features
- ✅ View assigned client cases
- ✅ Process applications
- ✅ Schedule meetings with clients
- ✅ Review and validate documents
- ✅ Provide recommendations
- ✅ Track case progress

### Admin Features
- ✅ User and access management
- ✅ Bank information management
- ✅ Monitor all system cases
- ✅ Generate reports and analytics
- ✅ System configuration and settings

---

## 🔐 Authentication Flow

1. User registers or logs in via login page
2. Backend validates credentials and generates JWT token
3. Token stored in localStorage (frontend)
4. Token sent with every request in Authorization header
5. Protected routes verify token validity
6. Routes redirect to login if token is invalid

---

## 📱 Frontend Pages

- **`index.html`** - Login page
- **`register.html`** - User registration
- **`client-dashboard.html`** - Client main dashboard
- **`admin-dashboard.html`** - Admin panel
- **`new-case.html`** - Create new mortgage case
- **`case-details.html`** - View/edit case details

---

## 🔗 API Endpoints Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

### Customer APIs
- `GET /api/customer/profile` - Get customer profile
- `GET /api/customer/cases` - List customer cases
- `POST /api/customer/cases` - Create new case
- `GET /api/customer/cases/{id}` - Get case details
- `POST /api/customer/documents` - Upload document
- `GET /api/customer/appointments` - List appointments

### Advisor APIs
- `GET /api/advisor/cases` - List advisor's cases
- `POST /api/advisor/appointments` - Schedule appointment
- `PUT /api/advisor/cases/{id}/status` - Update case status

### Admin APIs
- `GET /api/admin/cases` - All system cases
- `GET /api/admin/banks` - Manage banks
- `POST /api/admin/banks` - Add new bank

Detailed API documentation available in Swagger at `/swagger`

---

## 📊 Supported Banks

The system integrates information about major Israeli banks:
- **Bank HaPoalim** (בנק הפועלים) - Interest: 3.5%-5.2%
- **Bank Leumi** (בנק לאומי) - Interest: 3.8%-5.5%
- **Bank Discount** (בנק דיסקונט) - Interest: 3.6%-5.0%
- **Bank Mizrahi-Tefahot** (בנק מזרחי טפחות) - Interest: 3.7%-5.3%

---

## 🔧 Configuration

### Frontend Configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript settings
- `eslint.config.js` - ESLint rules

### Backend Configuration
- `appsettings.json` - General settings
- `appsettings.Development.json` - Development environment settings
- `.csproj` files - Project dependencies

---

## 📝 Build & Deployment

### Frontend Build
```bash
cd mortgage-ui
npm run build
# Output in dist/ folder
```

### Backend Build
```bash
cd Project
dotnet build
dotnet publish -c Release
```

---

## 🐛 Troubleshooting

### Frontend Issues
- **Port already in use**: Change port in `vite.config.ts`
- **Module not found**: Run `npm install` again
- **TypeScript errors**: Run `npm run lint` to check

### Backend Issues
- **Database locked**: Delete `app.db` and restart
- **Port conflicts**: Configure in `appsettings.json`
- **CORS errors**: Check CORS policy in `Program.cs`

---

## 📚 Additional Resources

- Frontend Documentation: `mortgage-ui/README.md`
- System Documentation: `mortgage_system/system-documentation.md`
- Site Options: `mortgage_system/site-options-documentation.md`

---

## 👥 Team

- **Project**: Sarahi & Chani
- **Role**: Full Stack Development

---

## 📄 License

This project is private and for educational/professional use only.

---

**Last Updated**: June 2025
**Version**: 1.0.0
