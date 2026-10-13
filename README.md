# АмитанГэр (АМИН PAWS) — backend + frontend

```
АМИН PAWS/
├── backend/    Express + MongoDB (controllers, middleware, router, schemas)
└── frontend/   Next.js (app router) + Tailwind CSS
```

## Backend (port 8000)
```
cd backend
cp .env.example .env     # MONGO_URI-аа оруул
npm install
npm run dev
```
Анхны админ: `.env` доторх ADMIN_EMAIL / ADMIN_PASSWORD (сервер асахад автоматаар үүснэ).

## Frontend (port 3000)
```
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```
- Хэрэглэгч: http://localhost:3000
- Админ: админ эрхээр нэвтэрвэл Header дээр "Админ" товч гарна → /admin
