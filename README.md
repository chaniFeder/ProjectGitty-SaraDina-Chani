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
- **יועצים**: ניהול תיקים של לקוחות, בדיקת מסמכים, עדכון סטטוס, והמלצות לתוכניות משכנתא
- **מנהלים**: ניהול בנקים, מעקב אחר מקרים ותחזוקת המערכת

---

## 🏗️ ארכיטקטורה כללית

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

## 🛠️ טכנולוגיות עיקריות

### Frontend (`mortgage-ui/`)
- React 19 + TypeScript
- Vite 8
- TailwindCSS 4
- Zustand לניהול מצב
- Axios לקריאות HTTP
- React Router לניתוב
- Radix UI ו-Lucide React לרכיבי ממשק

### Backend (`Project/`)
- ASP.NET Core 8
- C#
- SQLite
- JWT לאימות
- Swagger/OpenAPI לתיעוד API
- BL (Business Logic) לשכבת לוגיקה עסקית
- DAL (Data Access Layer) לשכבת גישה לנתונים

---

## 📁 מבנה הפרויקט

### Frontend
```
mortgage-ui/
├── src/
│   ├── api/                 # חיבור ל-API
│   ├── components/          # רכיבים כלליים
│   ├── features/            # מודולים לפי תפקידים
│   ├── router/              # ניתוב והרשאות
│   ├── store/               # Zustand state
│   ├── types/               # טיפוסים של TypeScript
│   └── utils/               # פונקציות עזר
├── public/
└── package.json
```

### Backend
```
Project/
├── server/                  # API של ASP.NET Core
│   ├── Controllers/        # בקרי Web API
│   ├── Services/           # שירותי עיבוד
│   ├── Program.cs
│   └── appsettings.json
├── BL/                     # לוגיקה עסקית
│   ├── Services/
│   ├── Models/
│   └── Api/
├── DAL/                    # גישה לנתונים
│   ├── Services/
│   ├── Api/
│   ├── Models/
│   └── database/
└── Ui/                     # אפליקציית ממשק שרת
```

---

## 💾 מסד נתונים

המערכת משתמשת במסד SQLite עם טבלאות עיקריות עבור:
- משתמשים
- תיקים
- בנקים
- פגישות
- מסמכים
- תשלומים

---

## 🚀 איך להתחיל

### דרישות
- Node.js 18+ (Frontend)
- .NET 8 SDK (Backend)
- Git
- Visual Studio Code או Visual Studio 2022

### התקנה

#### 1. שכפול הריפו
```bash
git clone <repository-url>
cd ProjectGitty-SaraDina-Chani
```

#### 2. התקנת Frontend
```bash
cd mortgage-ui
npm install
```

#### 3. התקנת Backend
```bash
cd ../Project
dotnet restore
```

---

## 💻 פיתוח

### הפעלת Frontend
```bash
cd mortgage-ui
npm run dev
```

האתר יהיה זמין ב-`http://localhost:5173`

### הפעלת Backend
```bash
cd Project
dotnet run --project server/server.csproj
```

---

## 📌 קיצור

הפרויקט מיועד להדגמת מערכת משכנתאות מלאה עם ממשק משתמש, שירותי backend, אימות ואנליזה בסיסית. README זה מיועד לשימוש בעברית ומסביר את מבנה הפרויקט, הדרישות והפעלה בסיסית.


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
