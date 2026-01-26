# Portfolio Website – React + Node.js

A full-stack contact form built with **React (frontend)** and **Node.js + Express (backend)**.  
Messages submitted from the frontend are sent directly to email using **Gmail SMTP (App Password)**.

---

## 🚀 Features

- ⚛️ React contact form
- ⏳ Loading spinner on submit
- 🔔 Toast notifications (success & error)
- 📩 Email sending via Nodemailer
- 🔐 Secure environment variables
- 🌐 CORS-enabled backend API

---

## 🧱 Tech Stack

### Frontend
- React
- Tailwind CSS
- Fetch API
- react-hot-toast

### Backend
- Node.js
- Express
- Nodemailer
- dotenv
- Gmail SMTP (App Password)

---

## 📁 Project Structure

```
FUTURE_FS_01/
│
├── portifolio-website-backend-node/
│ ├── src/
│ │ ├── assets/
│ │ │ └── defaults.js
│ │ ├── components/
│ │ │ ├── partials/
│ │ │ │ ├── ProjectImage.jsx
│ │ │ │ ├── Skill.jsx
│ │ │ │ └── Toast.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Contacts.jsx
│ │ │ ├── Intro.jsx
│ │ │ ├── Languages.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── Projects.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── index.css
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ └── vite.config.js
│
├── portifolio-website-backend-node/
│ ├── src/
│ │ ├── config/
│ │ │ └── mailer.js
│ │ ├── controllers/
│ │ │ └── contactController.js
│ │ ├── routes/
│ │ │ └── contactRoute.js
│ │ ├── app.js
│ │ ├── server.js
│ │ └── package.json
│ ├── .env.example
│ ├── .gitignore
│ ├── package-lock.json
│ └── package.json
│
└── README.md
```


---


## ⚙️ Environment Variables


Create a `.env` file inside the **backend** folder:


```env
PORT=5000


EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password


EMAIL_FROM=yourgmail@gmail.com
EMAIL_FROM_NAME=Your App Name
```

## ⚠️ IMPORTANT:
Use a Gmail App Password, NOT your normal Gmail password.

## ▶️ Running the Project Locally
### 1️⃣ Backend

```
cd backend
npm install
npm run dev
```
*You should see:*

```
Server is running on port 5000
✅ SMTP READY (Gmail app password working)
```
### 2️⃣ Frontend
```
cd frontend
npm install
npm run dev
```

*Frontend will be available at:*
```
http://localhost:5173
```

---


# 🔗 API Endpoint
## POST /api/contact

*Request body:*
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Subject",
  "message": "Hello!"
}
```
*Success response:*
```
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

### 🛡️ Security Notes

- .env file is ignored using .gitignore
- Never commit email credentials
- Uses TLS via Gmail SMTP

---

### 📸 UI Feedback

- Spinner shows while message is sending
- Toast appears on success or error
- Submit button is disabled during request

---

### 🧑‍💻 Author

#### Blaise
#### Full-Stack Developer
#### React • Node.js • Laravel • Backend Systems

---

### 📄 License

This project is open-source and free to use.
