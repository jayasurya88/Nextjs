https://nextjs-jayasurya-s-projects.vercel.app/
# DevOps Portfolio Website

A modern, iPhone-inspired portfolio website built with Next.js and Django, featuring a beautiful UI with smooth animations and dark mode support.

## Features

- 🎨 Modern, iPhone-inspired design
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🔄 Dynamic content management with Django backend
- 🚀 Fast and SEO-friendly with Next.js

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

### Backend
- Django 5.0
- Django REST Framework
- SQLite3 (can be changed to PostgreSQL)
- CORS Headers

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/Mac
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

6. Access the admin panel at [http://localhost:8000/admin](http://localhost:8000/admin)

## API Endpoints

- `GET /api/projects/` - List all projects
- `GET /api/services/` - List all services
- `POST /api/contact/` - Submit contact form

## Customization

1. Update your personal information in `src/app/page.tsx`
2. Modify the theme colors in `tailwind.config.js`
3. Add/modify projects and services through the Django admin panel

## Deployment

### Frontend
- Deploy to Vercel or any static hosting service
- Update the `NEXT_PUBLIC_API_URL` in `.env` file

### Backend
- Deploy to any Python hosting service (e.g., PythonAnywhere, Heroku)
- Update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` in settings.py
- Use environment variables for sensitive data

## License

MIT License
