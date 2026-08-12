#  Durga's Saree Pre-Pleating Services Web Application

A premium, modern, and mobile-first web application designed for a local **Saree Pre-Pleating, Draping, and Styling business**. Built using React, TypeScript, and Tailwind CSS, the application offers clients a seamless booking journey while providing the business owner with a fully-featured, secure admin management panel.

---

## Core Functionalities

### 1. Client Booking Journey
* **Multi-Step Booking Form (`/orders`)**: Guides clients through selecting saree count, fabric types (e.g. Kanjeevaram, Organza, Banarasi), specific services (pre-pleating, box folding, hanger folding, tassels), target completion date, festive add-ons, and contact details.
* **Instant WhatsApp & Email Generator**: Dynamically compiles the client's form inputs into a beautifully formatted, ready-to-send enquiry text, opening a chat directly with the business WhatsApp number or triggering a draft email fallback.
* **Responsive Portfolio Gallery (`/categories`)**: Filterable masonry grid sorted by category (Pre-Pleating, Draping, Festive, Traditional, Special Occasions) with an image lightbox zoom modal. Includes specific filter logic allowing target photos to display *only* when their specific category tab is active to keep the homepage clutter-free.

### 2. Client Conversion & Trust Building
* **How It Works Section**: A step-by-step visual workflow explaining enquiry, hand-off, expert pleating, and delivery.
* **Client Reviews / Testimonials**: Carousel cards highlighting real client feedback from brides, students, and festival goers.
* **Interactive FAQ Accordion**: Interactive Q&A list addressing common client questions like processing times, travel packing security, fabric care, and draping.

### 3. Business Management Panel (`/admin`)
* **Secure Auth Gateway**: Route-guarded login portal protecting business analytics and customer records.
* **Order Management Dashboard**: Displays a comprehensive table of all submitted bookings, sorting them by date and tracking customer location details.
* **Status Updates**: Change order status on the fly (`Pending` ➔ `In Progress` ➔ `Completed` ➔ `Cancelled`) to track tasks.
* **Export & Search**: Includes real-time search filtering (by name, phone, or location) and a **CSV Export** button that downloads all order records for offline bookkeeping.
* **Dynamic Business Settings Editor**: Allows the administrator to edit contact info (WhatsApp number, email, address, and Google Maps embed URL) directly from the dashboard form. Changes persist in local storage and instantly update headers, footers, and links across the site without touching the codebase.

---

## 🛠️ Technical Stack

* **Frontend Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **CSS & Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive layouts. Custom vanilla CSS rules are used for advanced animations:
  * **Zari Borders (`.zari-card`)**: A custom card double-border design styled to look like traditional golden zari threads on silk sarees.
  * **Marigold/Diya Motif Dividers (`.motif-divider`)**: Custom dividers utilizing pseudo-elements to render a centered `🌸 🪔 🌸` motif with gold gradients.
  * **Sparkle Animations (`.festive-sparkle`)**: Keyframe floating/rotation effects applied to background overlays and brand marks for a festive vibe.
* **Icons**: [Lucide React](https://lucide.dev/)
* **Router**: [React Router DOM](https://reactrouter.com/) (configured in `BrowserRouter` format for clean URLs).
* **Database Representation**: Simulated client-side DB (`localStorage`) with simulated network latencies (300ms delays) to mock real database response times.
* **Deployment Config**: Vercel-ready with rewrites setup in `vercel.json` to support clean single-page app (SPA) refreshes.

---

## 📁 File Structure Highlights

* `src/components/` - Holds UI elements including section templates:
  * [IntroductionSection.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/components/IntroductionSection.tsx) - Core introduction block.
  * [HowItWorks.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/components/HowItWorks.tsx) - Onboarding steps.
  * [TestimonialsSection.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/components/TestimonialsSection.tsx) - Review cards.
  * [FaqSection.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/components/FaqSection.tsx) - Collapsible FAQs.
  * `booking/` - Booking components (selectors, summaries).
  * `gallery/` - Masonry grids and lightboxes.
* `src/pages/` - Router pages:
  * [Home.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/pages/Home.tsx) - Main page layout combining all landing elements.
  * [AdminDashboard.tsx](file:///c:/Users/user/Documents/durgassareeprepleating/src/pages/AdminDashboard.tsx) - Order management table & settings editor.
* `src/data/` - Static records:
  * [business.ts](file:///c:/Users/user/Documents/durgassareeprepleating/src/data/business.ts) - Storage-backed settings object.
  * [gallery.ts](file:///c:/Users/user/Documents/durgassareeprepleating/src/data/gallery.ts) - Image arrays.
* `src/lib/` - Local mock database, auth, and WhatsApp string parsers.

---

## 💻 Local Development

### 1. Installation
Clone the repository, navigate into the directory, and install dependencies:
```sh
npm install
```

### 2. Start Dev Server
Run the local Vite development server:
```sh
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### 3. Production Build
Verify code compilation and create a minified output in the `dist` folder:
```sh
npm run build
```

---

## ☁️ Deployment on Vercel

The application is pre-configured for Vercel. 
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Import the `durgassareeprepleating` repository.
3. Keep default settings and click **Deploy**.
