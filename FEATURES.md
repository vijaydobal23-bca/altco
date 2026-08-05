# Altco E-Commerce Platform - Feature Documentation

This document outlines the complete feature set of the Altco E-Commerce platform based on the current architecture and implementation.

## 1. Authentication & Authorization
- **JWT-Based Authentication**: Secure stateless authentication using JSON Web Tokens.
- **Cross-Origin Sessions**: HTTP-Only, Secure, `SameSite=none` cookies allowing seamless integration between the Vercel frontend and Render backend.
- **Auto-Login**: Users are instantly logged in upon registration and redirected to the home page without friction.
- **Role-Based Access Control (RBAC)**:
  - **Buyer**: Standard accounts for customers.
  - **Seller**: Merchant accounts requiring a "Store Name" to list and manage inventory.

## 2. Seller Dashboard & Inventory Management
- **Product Creation**: Sellers can upload and list new drinks/beverages on the platform.
- **Product Modification**: Ability to edit existing product details (price, description, stock).
- **Product Deletion**: Sellers can remove their products from the marketplace.
- **Store Identity**: Sellers operate under a specific store name associated with their account.

## 3. Shopping Experience (Buyer Features)
- **Product Browsing**: Users can view the full catalog of healthy, vegan, and zero-sugar drinks.
- **Shopping Cart**:
  - Add/remove items.
  - Adjust quantities.
  - Automatic subtotal and total calculations.
  - Persistent state management via Context API.
- **Checkout & Payment**:
  - Streamlined checkout page themed with the brand's premium blue/glassmorphism aesthetic.
  - Simulated payment processing (UPI/QR modal configured for smooth user experience).

## 4. Notifications & Order Tracking
- **Receipt-Style Notifications**: A unique, bill-like notification layout for tracking orders.
- **Real-Time Data Fetching**: Notifications automatically refetch upon opening the page to ensure users always see the latest status (e.g., "Order Delivered").
- **Notification Badges**: Visual indicators alerting users of unread messages or order updates.

## 5. UI/UX & Aesthetics
- **Modern Tech Stack**: React + TailwindCSS for rapid, responsive design.
- **GSAP Animations**:
  - Scroll-triggered animations for elements entering the viewport.
  - Split-text typography animations.
  - Multi-directional footer sliding animations for a dynamic, premium feel.
- **Premium Theming**: Distinct color palettes (dark blues, vibrant greens, purples) emphasizing a "Good Gut," "Zero Sugar," and "100% Vegan" brand identity.
- **Glassmorphism**: Translucent panels and frosted glass effects used in auth forms and checkout pages.

## 6. Architecture & Deployment
- **Frontend**: Vite + React, deployed to Vercel (`dist` output).
- **Backend**: Node.js + Express + MongoDB, deployed to Render.
- **CORS Configuration**: Explicitly allows traffic from the Vercel production URL to securely fetch data from the Render API.
- **Multi-Stage Docker**: Backend includes a Dockerfile supporting isolated environment deployments if needed.
