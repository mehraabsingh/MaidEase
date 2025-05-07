# MaidEase - Online Maid Hiring Platform

**MaidEase** is a Node.js and Express-based web application designed to simplify the process of finding and hiring maids online. It allows users to view available services, book maids, and negotiate service prices through a user-friendly interface.

## 🚀 Features

- 🏠 Homepage with service highlights
- 🧹 Service listing with categories
- 📋 Booking form for maid services
- 💬 Negotiation form with POST request handling
- 💾 Data storage using `negotiations.json`
- 🎨 EJS templates for dynamic rendering
- 🧩 Middleware for request parsing and error handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Frontend**: HTML, CSS, JavaScript
- **Data Handling**: JSON (file-based)
- **Middleware**: Body-parser, custom error-handling

## 📁 Folder Structure

```

MaidEase/
├── public/             # Static assets (CSS, JS)
│   ├── styles.css
│   └── script.js
├── views/              # EJS templates
│   ├── index.ejs
│   ├── services.ejs
│   └── booking.ejs
├── negotiations.json   # Stores negotiation submissions
├── server.js           # Main Express app
├── README.md           # Project documentation

````

## 🔄 Request Flow in Express

1. Client sends request (GET/POST).
2. Express routes handle requests via endpoints.
3. Middleware parses request body.
4. Data is processed or stored (e.g., in `negotiations.json`).
5. Response is sent back using EJS-rendered views.

## 🧪 How to Run Locally

```bash
git clone https://github.com/mehraabsingh/MaidEase.git
cd MaidEase
npm install
node server.js
````

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Upcoming Improvements

* User authentication and login system
* Admin dashboard to manage bookings
* MongoDB integration for better data handling

## 📧 Contact

Made by **Mehraab Singh**
If you have suggestions or feedback, feel free to [open an issue](https://github.com/mehraabsingh/MaidEase/issues).

---
