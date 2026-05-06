# Product List with Cart 🛒

🔗 **Live Demo**  
https://productlist-with-card.netlify.app/

📦 **Repository**  
https://github.com/cankurtduygu/product-list-with-cart-main

---

## 📸 Demo

Below is a preview of the application interface:

![Product List with Cart Preview](./preview.jpg)

---

## 📖 Description

This project is a solution to the **Frontend Mentor – Product list with cart** challenge.

The goal of this project is to build a responsive product listing page with a fully functional shopping cart using **vanilla JavaScript**, **HTML**, and **CSS**, matching the provided design as closely as possible.

All product data is dynamically loaded from a local `data.json` file.

---

## 🎯 Problem Statement

Users should be able to:

- Add products to the cart
- Increase and decrease product quantities
- Remove products from the cart
- See an order confirmation modal after clicking **Confirm Order**
- Reset the cart and start a new order
- View an optimal layout across different screen sizes
- See hover and focus states for all interactive elements

---

## 🧩 Project Structure

```bash
PRODUCT-LIST-WITH-CART
├── assets
│   ├── fonts
│   └── images
│
├── css
│   ├── _base.css
│   ├── component.css
│   ├── main.css
│   ├── modal.css
│   └── yourcard.css
│
├── design
│   ├── desktop-design.jpg
│   └── mobile-design.jpg
│
├── app.js
├── data.json
├── index.html
├── preview.jpg
├── style.css
├── style-guide.md
├── README.md
└── .gitignore
```

## ⚙️ Features & Implementation Details

- Product data is fetched asynchronously from `data.json`
- Cart state is managed using a **Map object** to prevent duplicate products
- Each product stores its own `quantity` value inside the cart state
- UI updates are synchronized between:
  - Product list
  - Cart sidebar
  - Order confirmation modal
- Fully responsive layout using **CSS Grid** and **Flexbox**
- Modal confirmation screen with order summary
- Clean separation between UI rendering and state logic

---

## 🧠 Key Concepts Practiced

- DOM manipulation with Vanilla JavaScript
- State management without frameworks
- Working with `Map` for structured cart data
- Event handling and UI synchronization
- Responsive layout design (mobile-first approach)
- Modal interactions and UI reset logic

---

## 👤 User Stories

- When I click **Add to Cart**, the product is added to the cart
- When I click **+ / −**, the product quantity updates correctly
- When I remove a product from the cart, the product UI resets
- When I confirm the order, I see a detailed order summary
- When I start a new order, the cart and UI reset completely

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript (ES6+)
- Fetch API
- Frontend Mentor design assets

---

## 🚀 Deployment

The project is deployed using **GitHub Pages**.

---

## 📌 Notes

This project was built as a learning exercise to strengthen my understanding of:

- JavaScript state management without frameworks
- Dynamic UI rendering
- Responsive layouts
- Building real-world interactive components

Feedback and suggestions are always welcome 😊

---

## 🙌 Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io).  
Coded by **Duygu Cankurt**.



