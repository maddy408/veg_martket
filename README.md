# Sri Bhavani Vegetables POS & Commission ERP
### ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம் — பில்லிங் & கணக்கு மென்பொருள்

Wholesale Vegetable Market Commission Agency & Retail/Bulk POS System built with **React + Vite + Tailwind CSS** frontend, modern **PHP** REST backend, and **MySQL** database.

---

## 🌟 Key Features

1. **High-Speed Keyboard-First Billing**
   - Vegetable shortcut codes (e.g. `A` for Tomato, `H` for Brinjal, `L` for Carrot, `AQ` for Lorry Freight, `AR` for Cooli).
   - Quantity expressions (e.g. `L 1.5` or `1.5 L`).
   - Seamless arrow-key customer search & automatic field focus transition.
   - Hold bill / Recall bills (F2) and Quick Save & Print (F9).

2. **Dual-Mode Commission & Normal Billing**
   - **Normal Bill**: Direct retail/wholesale bills with payment methods (Cash, UPI, Credit).
   - **Commission Bill (Mandi Style)**: Deductions (Commission %, கூலி, வாடகை, பற்று, பிற கழிவுகள்) with automatic ledger tracking.

3. **Authentic Mandi Invoice & Slip Formats**
   - Surandai Mandi format, A5 Print Format, Payment Receipts, and Purchase Invoices.
   - Clean column alignments, deity headers (ஸ்ரீ பவானி அம்மன் துணை, ஸ்ரீ பொட்டல் மாடசாமி), and VTC logo branding.

4. **Party Ledgers & Accounting**
   - Unified running ledger balance for every customer & supplier.
   - Automatic allocation on FIFO or manual selection.
   - Advance / Credit tracking.

5. **Purchases, Stock, Items & Day-wise Reports**
   - 40+ pre-seeded Tamil Nadu vegetable commodities with Tamil and English names.
   - Day-wise sales, item-wise sales, party credit statements, and collection audits.

---

## 📁 Repository Structure

```
qynova-bavani-vegetables/
├── backend/
│   ├── config/              # Database and application configuration
│   ├── database/
│   │   ├── migrations/      # Sequential database migrations
│   │   ├── schema.sql       # Full master schema (all 15 tables)
│   │   ├── seed.sql         # Default users, items, settings & sequences
│   │   └── veg_pos_full_dump.sql # Complete live MySQL database dump
│   ├── public/              # API entry point (index.php)
│   ├── src/                 # Controllers, Models, Services, Middleware
│   ├── .env.example
│   └── composer.json
├── frontend/
│   ├── public/              # Static assets, deity photos, logos, PWA icons
│   ├── src/
│   │   ├── api/             # Axios API client modules
│   │   ├── components/      # UI components & print invoice layouts
│   │   ├── config/          # Central API base URL configuration (api.js)
│   │   ├── hooks/           # Custom React hooks (useAuth, useSettings)
│   │   ├── i18n/            # Tamil & English localization
│   │   ├── pages/           # Billing, Purchases, Payments, Items, Reports
│   │   ├── theme/           # Central design system (colors, buttons, cards)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Database Setup
1. Create a MySQL database named `veg_pos`:
   ```sql
   CREATE DATABASE veg_pos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Import the schema and seed data:
   - **Option A (Master Schema + Seed)**:
     Import `backend/database/schema.sql` followed by `backend/database/seed.sql`.
   - **Option B (Complete Dump)**:
     Import `backend/database/veg_pos_full_dump.sql` directly.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Copy `.env.example` to `.env` and configure your database credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=veg_pos
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
3. Install dependencies:
   ```bash
   composer install
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Copy `.env.example` to `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost/pos/veg-pos/backend/public/api
   ```
   *(Or adjust according to your local server virtual host / XAMPP path)*
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Production build:
   ```bash
   npm run build
   ```

---

## 🔑 Default Login Credentials
- **Username**: `admin`
- **Password**: `Admin@123`
