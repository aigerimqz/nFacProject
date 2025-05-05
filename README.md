# Bailanysta

**Bailanysta** is a personal blog-style web application developed for user profile display and content sharing. Users can register, log in, and manage their profiles. They can create and view their own posts, which are automatically sorted by date. This project was built as part of a full-stack web development course and demonstrates the integration of modern frontend and backend technologies.

---

## 🌐 Theme

The theme of the project is **personal expression and identity**. The goal is to create a space where users can share their thoughts or creative posts under their personal profiles. The design focuses on simplicity and individuality, with minimal distractions and clear navigation. 

---  


## ✨ Features

* **User Registration & Login**
  Users can create accounts, log in, and securely access their profiles.

* **JWT Authentication**
  Secure login using JSON Web Tokens with access/refresh token handling.

* **User Profiles**
  Each user has a personal profile page displaying their posts and info.

* **Post Creation & Viewing**
  Users can create new posts, which are displayed on their own and others' profiles.

* **Post Sorting**
  Posts are automatically sorted by date, newest at the top.

* **Dynamic Routing**
  Clean, parameterized URLs like `/users/:username` and `/posts/:id`.

* **Responsive UI Components** *(in progress)*
  Designed with a focus on simplicity and minimalism.

* **Manual Token Management**
  Access and refresh tokens are stored in `localStorage` and checked manually.

* **Standalone Angular Components**
  Modern Angular structure using `standalone: true` for cleaner codebase.



---  

## 🛠️ Technologies Used

**Frontend (Angular)**

* Angular 17
* TypeScript
* Angular Router
* RxJS for reactive programming
* HTML5, CSS3

**Backend (Django + DRF)**

* Django 4.x
* Django REST Framework
* Simple JWT for token-based authentication
* SQLite (dev) / PostgreSQL (prod)

---

## 🚀 Installation & Setup

### Backend

```bash
git clone https://github.com/yourusername/bailanysta.git
cd bailanysta/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd bailanysta/frontend
npm install
ng serve
```

---

## 🧩 Design & Development Process

The project was approached using the following steps:

1. **Requirements Gathering:** Define minimum features: auth, profile, posts.
2. **Design:** Simple, clean UI using Angular components. Backend REST API with Django.
3. **Database Design:** Users, Posts, Tokens – created in Django models with serializers.
4. **JWT Integration:** Secure login using access/refresh tokens via HTTP headers.
5. **Routing:** Angular routes for profile, users, and posts with parameterized paths.
6. **Testing:** Manual testing on both frontend and backend to ensure token flow and rendering logic.

---

## 💡 Unique Approaches & Methodologies

* **Standalone Angular Components:** Used Angular’s latest `standalone: true` feature to simplify module structure.
* **Dynamic Routing:** Implemented Angular routes with parameters (e.g., `/users/:username`) to dynamically load content.
* **Post Sorting Logic:** Implemented client-side sorting using `Array.sort()` based on timestamps from the backend.
* **Token Storage & Expiration:** Managed tokens manually in localStorage with logout triggers on expiration.

---

## ⚖️ Trade-offs

* **Manual JWT Handling vs Angular Guards:** We chose to handle JWT manually instead of using advanced route guards for simplicity and better control in a learning project.
* **Client-side Sorting vs Server-side:** Sorting is done on the frontend to avoid overcomplicating backend queries during development, though server-side sorting would be more efficient at scale.
* **Static Design vs CSS Frameworks:** Used basic CSS instead of a UI library like Tailwind or Bootstrap to better understand layout fundamentals.

---

## 🐞 Known Issues / Limitations

* Access tokens may expire without automatic refresh — currently, users must log in again manually.
* No WYSIWYG editor or Markdown support for posts.
* Minimal input validation and form error feedback on the frontend.
* Not optimized for mobile view (in progress).  
* No like/comment system (will be in future, in cause of deadline I didn't have a time)

---

## ❓ Why This Stack?

* **Angular** was chosen to gain experience with a structured, enterprise-ready frontend framework with strong typing and component-based architecture.
* **Django REST Framework** was selected for its powerful serialization, fast development, and robust community.
* **JWT (Simple JWT)** enables stateless, secure authentication suited for RESTful architecture.
* Both technologies are popular and in demand, making the stack practical for future job opportunities.

---

## 👤 Author

* **Name:** \[Aigerim]
* **Email:** \[[aigerim-manat@mail.ru](mailto:aigerim-manat@mail.ru)]
* **GitHub:** \[https://github.com/aigerimqz]

---



