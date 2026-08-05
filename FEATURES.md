# Altco – Complete Feature List

A full-stack e-commerce platform for healthy drinks (vegan, zero-sugar, high-protein).
Built with **React + Vite** (Frontend) and **Node.js + Express + MongoDB** (Backend).

---

## 🔐 Auth (Authentication)

### Register
- User can register as a **Buyer** or a **Seller**
- Seller registration requires an additional **Store Name** field
- Password is securely hashed using `bcrypt`
- On successful registration, user is **automatically logged in** (JWT cookie set)
- Redirects to **Home page** after registration

### Login
- Login with **Email + Password**
- On success, a secure **HTTP-Only JWT cookie** is set (`SameSite=none`, `Secure=true`)
- Token is also returned in the response body as a fallback
- Invalid credentials show an error message via toast notification
- Redirects to **Home page** on success

### Logout
- Clears the JWT cookie from the browser
- Resets the user state in the app context

### Protected Routes
- Routes like Cart, Checkout, Notifications, Order History, and Seller Dashboard are all **protected**
- If a user is not logged in, they are redirected to the Login page

---

## 🏠 Home (Homepage)

### Hero Section
- Animated landing banner with brand messaging

### Hero2 / Message Section
- "GOOD GUT" animated heading using **GSAP SplitText**
- Scroll-triggered word-by-word animation
- Feature leaves (SVG): 100% Vegan, Complete Protein, Zero Sugar, Lactose Free — each with a suitable description

### Drink Section
- Showcases the product catalog with images and key benefits
- Animated product cards

### Alt Menu
- A visual display of the complete product menu

### Oats Section
- Dedicated section for oat-based products

### Product Section
- A scrollable showcase of available products with "Add to Cart" functionality

### Footer
- Multi-directional GSAP scroll-triggered animations:
  - Center logo slides in from the bottom
  - Left-side text slides in from the left
  - Right-side text slides in from the right
- Links to social media and site pages

### Navbar
- Displays the Altco brand logo
- Navigation links: Home, Store, Cart, Orders, Notifications
- Shows a **Notification Badge** with unread count
- Adapts to the user's login state

---

## 🛒 Cart

- View all items currently in the cart
- **Add** products to cart (from Store/Product pages)
- **Remove** individual items from the cart
- **Update quantity** of each item (+/-)
- Displays **subtotal per item** and **grand total**
- Empty cart state with a helpful illustration
- "Proceed to Checkout" button navigates to the Checkout page
- Cart state managed via **CartContext** (React Context API)

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cart/add` | Add a product to cart |
| `GET` | `/api/cart/` | Fetch current user's cart |
| `PUT` | `/api/cart/update/:productId` | Update quantity of a cart item |
| `DELETE` | `/api/cart/remove/:productId` | Remove a specific item |
| `DELETE` | `/api/cart/clear` | Clear the entire cart |

---

## 💬 Notifications

- **Receipt/Bill-style layout** — each notification is displayed like a physical bill receipt
- Notifications appear line by line (not collapsed in a single row)
- **Unread badge** on the Navbar showing count of unread notifications
- On page load, notifications are **auto-refetched** to catch latest updates (e.g., "Order Delivered")
- Mark a **single notification** as read
- Mark **all notifications** as read at once
- Notification types include order status updates (e.g., Order Placed, Out for Delivery, Delivered)

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notifications/` | Fetch all notifications for logged-in user |
| `PUT` | `/api/notifications/:id/read` | Mark one notification as read |
| `PUT` | `/api/notifications/read-all` | Mark all notifications as read |

---

## 📦 Order History

- Lists all orders placed by the logged-in buyer
- Each order shows: product name, quantity, price, and current status
- Status labels: **Pending → Processing → Out for Delivery → Delivered**
- Timestamps for order placement
- Styled in the website's dark blue theme

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders/` | Fetch all orders for the logged-in user |

---

## 🏪 Store (Product Browsing)

- Public product catalog — viewable without login
- Each product card shows: image, name, price, description
- **Add to Cart** button on each product (requires login)
- Filtered to show only available/in-stock products

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/all` | Fetch all products (public) |

---

## 💳 Checkout & Payment

- Accessible only to logged-in buyers
- Displays an **Order Summary** (items, quantities, prices, total)
- Supports address entry for delivery
- **Payment via UPI / QR code** — shows a QR modal for payment confirmation
- No UPI ID input required from the user (simplified flow)
- On confirming payment, an order is **created in the database**
- Cart is **cleared automatically** after a successful order
- A **"Order Placed"** notification is sent to the user
- Full website theme (dark blue, glassmorphism, white typography)

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders/` | Create a new order (requires auth) |

---

## 🧑‍💼 Seller Dashboard

### Dashboard Overview (`SellerDashboard.jsx`)
- Summary stats: total products, total orders, revenue
- Quick navigation to sub-sections

### Product Management

#### Create Product (`CreateProduct.jsx`)
- Form to add a new product: name, description, price, stock, image upload
- Image uploaded via **Multer** (stored in memory)
- Product is linked to the logged-in seller's account

#### My Products (`ProductList.jsx`)
- Table/grid of all products listed by the seller
- **Edit** product details inline (name, price, description, stock)
- **Delete** a product permanently

### Seller Orders (`SellerOrders.jsx`)
- View all orders that contain the seller's products
- **Update order status**: Pending → Processing → Out for Delivery → Delivered
- When status is updated, a **notification is automatically sent to the buyer**

### API Endpoints (Seller — all require seller auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/seller` | Get all products by logged-in seller |
| `POST` | `/api/products/create` | Create a new product (with image) |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |
| `PUT` | `/api/orders/:orderId/status` | Update order delivery status |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS v4 |
| Animations | GSAP, ScrollTrigger, SplitText |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (HTTP-Only Cookie) + bcryptjs |
| File Upload | Multer (memory storage) |
| Frontend Host | Vercel |
| Backend Host | Render |

---

## 🌐 Deployment

| Service | URL |
|---------|-----|
| Frontend (Vercel) | https://altco-xzbl.vercel.app |
| Backend (Render) | https://altco-2.onrender.com |
| GitHub Repo | https://github.com/vijaydobal23-bca/altco |
