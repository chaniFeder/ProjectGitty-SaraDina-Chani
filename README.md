# מערכת ניהול משכנתאות

מערכת שלמה לניהול משכנתאות עם ממשק משתמש מודרני בצד הלקוח ו-API חזק בצד השרת. המערכת מיועדת לניהול תיקים, העלאת מסמכים, תיאום פגישות ותקשורת בין יועצים ללקוחות.

---

## 📌 מה בקובץ

הפרויקט מחולק לשני חלקים עיקריים:
- `mortgage-ui/` — ממשק frontend של React + TypeScript
- `Project/` — backend של ASP.NET Core עם שכבת עסקית (BL) ושכבת גישה לנתונים (DAL)

---

## 🎯 תפקידים במערכת

- **לקוחות**: יצירת תיקים, מעקב אחר סטטוס, העלאת מסמכים ותיאום פגישות
- **יועצים**: ניהול תיקים של לקוחות, בדיקת מסמכים, עדכון סטטוס, רישום לקוחות חדשים
- **מנהלים**: ניהול בנקים, תוכניות משכנתא, יועצים, מעקב אחר מקרים וסטטיסטיקות

---

## 🏗️ ארכיטקטורה כללית

```
Frontend (mortgage-ui)          Backend (Project)
├── React 19                    ├── ASP.NET Core 8
├── TypeScript                  ├── JWT Authentication
├── Vite 8                      ├── Swagger/OpenAPI
└── TailwindCSS 4               └── SQLite Database
                                    ├── Business Logic (BL)
                                    ├── Data Access Layer (DAL)
                                    └── API Controllers
```

---

## 🛠️ טכנולוגיות עיקריות

### Frontend (`mortgage-ui/`)
- React 19 + TypeScript
- Vite 8
- TailwindCSS 4
- Zustand + Redux Toolkit לניהול מצב
- Axios לקריאות HTTP
- React Router v7 לניתוב
- Radix UI, Lucide React, React Hook Form + Zod לממשק וולידציה

### Backend (`Project/`)
- ASP.NET Core 8 / C#
- SQLite + Entity Framework Core
- JWT לאימות (תוקף 8 שעות)
- Swagger/OpenAPI לתיעוד API
- BL (Business Logic) — שכבת לוגיקה עסקית
- DAL (Data Access Layer) — שכבת גישה לנתונים

---

## 📁 מבנה הפרויקט

### Frontend
```
mortgage-ui/
├── src/
│   ├── api/                 # חיבור ל-API (auth, customer, advisor, admin)
│   ├── components/          # רכיבים כלליים (layout, ui)
│   ├── features/            # מודולים לפי תפקידים (admin, advisor, auth, customer)
│   ├── router/              # ניתוב והרשאות (ProtectedRoute)
│   ├── store/               # Zustand + Redux state
│   ├── types/               # טיפוסי TypeScript
│   └── utils/               # פונקציות עזר
├── public/
└── package.json
```

### Backend
```
Project/
├── server/                  # API של ASP.NET Core
│   ├── Controllers/
│   │   ├── Admin/           # AdminController
│   │   ├── Advisor/         # AdvisorCases, Appointments, Customers, Documents
│   │   ├── AuthController
│   │   ├── AdvisorsController
│   │   ├── CustomerCasesController
│   │   ├── CustomerAppointmentsController
│   │   ├── CustomerDocumentsController
│   │   ├── CustomerMortgageController
│   │   └── CustomerProfileController
│   ├── Services/            # JwtService
│   ├── Program.cs
│   └── appsettings.json
├── Bl/                      # לוגיקה עסקית
│   ├── Api/                 # ממשקים (ICustomerApi, IAdvisorApi, IAdminApi)
│   ├── Models/
│   └── Services/
├── Dal/                     # גישה לנתונים
│   ├── Api/                 # ממשקים (ICases, IUsers, IDocuments וכו')
│   ├── Models/              # מודלים (Case, Customer, Bank, Appointment וכו')
│   ├── Services/            # מימוש שירותי DAL
│   ├── database/            # mortgage.db (SQLite)
│   └── DalManager.cs
└── Project.sln
```

---

## 💾 מסד נתונים

SQLite — נוצר אוטומטית בהרצה ראשונה. טבלאות עיקריות:
- Users, Customers
- Cases, Mortgages, MortgagePrograms
- Banks
- Appointments
- Documents
- Payments

**משתמשי ברירת מחדל (seed):**
| UserId | Username | Password | Role |
|--------|----------|----------|------|
| 000000001 | admin | admin123 | admin |
| 000000002 | advisor1 | advisor123 | advisor |

---

## 🚀 איך להתחיל

### דרישות
- Node.js 18+
- .NET 8 SDK
- Git

### התקנה

```bash
git clone <repository-url>
cd ProjectGitty-SaraDina-Chani
```

#### Frontend
```bash
cd mortgage-ui
npm install
npm run dev
```
זמין ב-`http://localhost:5173`

#### Backend
```bash
cd Project/server
dotnet run
```
זמין ב-`http://localhost:5269` / `https://localhost:7074`  
Swagger UI: `http://localhost:5269/swagger`

---

## 🔐 Authentication Flow

1. משתמש מתחבר דרך `POST /api/auth/login`
2. Backend מחזיר JWT token (תוקף 8 שעות)
3. Token נשמר ב-localStorage
4. כל בקשה שולחת `Authorization: Bearer <token>`
5. נתיבים מוגנים מאמתים את ה-token לפי role

**Roles:** `customer`, `advisor`, `admin`

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | תיאור |
|--------|----------|-------|
| POST | `/api/auth/login` | התחברות |
| POST | `/api/auth/register` | הרשמת לקוח חדש |

### Customer APIs (role: customer)
| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/api/customer/profile` | פרופיל לקוח |
| PUT | `/api/customer/profile/contact` | עדכון פרטי קשר |
| GET | `/api/customer/cases` | תיקים של הלקוח |
| GET | `/api/customer/appointments` | פגישות קרובות |
| POST | `/api/customer/appointments` | בקשת פגישה |
| GET | `/api/customer/documents` | מסמכים של הלקוח |
| POST | `/api/customer/documents` | העלאת מסמך |
| GET | `/api/customer/mortgages` | משכנתאות של הלקוח |
| GET | `/api/customer/mortgages/{id}` | פרטי משכנתא |
| GET | `/api/customer/mortgages/{id}/payments` | לוח תשלומים |

### Advisor APIs (role: advisor)
| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/api/advisor/cases` | תיקים של היועץ |
| POST | `/api/advisor/cases` | יצירת תיק |
| PUT | `/api/advisor/cases/{id}/status` | עדכון סטטוס תיק |
| GET | `/api/advisor/appointments` | פגישות של היועץ |
| PUT | `/api/advisor/appointments/{id}/status` | עדכון סטטוס פגישה |
| GET | `/api/advisor/customers` | כל הלקוחות |
| GET | `/api/advisor/customers/{id}` | לקוח לפי ID |
| POST | `/api/advisor/customers` | רישום לקוח חדש |
| GET | `/api/advisor/documents/{customerId}` | מסמכי לקוח |
| PUT | `/api/advisor/documents/{id}/verify` | אימות מסמך |

### Admin APIs (role: admin)
| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/api/admin/statistics` | סטטיסטיקות מערכת |
| GET | `/api/admin/cases` | תיקים פעילים |
| GET | `/api/admin/banks` | רשימת בנקים |
| POST | `/api/admin/banks` | הוספת בנק |
| PUT | `/api/admin/banks/{id}` | עדכון בנק |
| GET | `/api/admin/programs` | תוכניות משכנתא |
| POST | `/api/admin/programs` | הוספת תוכנית |
| PUT | `/api/admin/programs/{id}/rate` | עדכון ריבית |
| GET | `/api/admin/users` | רשימת יועצים |
| POST | `/api/admin/users` | הוספת יועץ |

### General
| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/api/advisors` | רשימת יועצים (לבחירה בפגישה) |

---

## 🔧 Configuration

### Backend (`appsettings.json`)
```json
{
  "Jwt": {
    "Key": "...",
    "Issuer": "MortgageSystem",
    "Audience": "MortgageSystemUsers",
    "ExpiryHours": 8
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=...mortgage.db"
  },
  "AllowedOrigins": "http://localhost:5173"
}
```

### Frontend
- `vite.config.ts` — הגדרות build
- `tsconfig.json` — הגדרות TypeScript
- `eslint.config.js` — חוקי ESLint

---

## 📝 Build

### Frontend
```bash
cd mortgage-ui
npm run build
# פלט בתיקיית dist/
```

### Backend
```bash
cd Project
dotnet build
dotnet publish -c Release
```

---

## 🐛 Troubleshooting

- **Frontend — port תפוס**: שנה ב-`vite.config.ts`
- **Frontend — module not found**: הרץ `npm install`
- **Backend — database locked**: מחק `mortgage.db` והפעל מחדש
- **Backend — CORS errors**: בדוק `AllowedOrigins` ב-`appsettings.json`
- **Backend — port conflicts**: שנה ב-`Properties/launchSettings.json`

---

## 👥 Team

- **Project**: Sara & Dina & Chani
- **Role**: Full Stack Development

---

## 📄 License

This project is private and for educational/professional use only.

---

**Last Updated**: June 2025 | **Version**: 1.0.0
