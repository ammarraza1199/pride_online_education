# Pre-Deployment Checklist

Before deploying the Pride Online Education web application to production, you must update the following placeholder and dummy values with real data.

## 1. Google Analytics (SEO & Tracking)
Placeholder values like `G-XXXXXXXXXX` need to be replaced so you can track website visitors.

* **Where to change:** `index.html` (Lines 11, 16)
* **What to change:** Replace `G-XXXXXXXXXX` with your actual Google Analytics 4 Measurement ID.
* **How to get this:** Create a property on [Google Analytics](https://analytics.google.com/) to get the `G-` ID.

## 2. Contact Information (Phone, Email, Address, Hours)
Currently, there is a placeholder phone number (`+91 7760345397`), email (`info@prideonlineeducation.com`), and physical address (Belagavi).

* **Where to change:**
  * `src/components/Header.jsx` (Lines 49, 61, 69)
  * `src/components/Footer.jsx` (Lines 48, 74, 78, 85)
  * `src/pages/Contact.jsx` (Lines 121, 131, 141, 151)
* **What to change:** Update the hardcoded strings to match your real business phone number, email address, physical address, and operating hours.
* **How to get this:** Use your actual business contact details.

## 3. Social Media Links
The social media icons in your footer currently point nowhere (`href="#"`).

* **Where to change:** `src/components/Footer.jsx` (Lines 65-67)
* **What to change:** Replace the `href="#"` with the actual URLs to your social media profiles.
* **How to get this:** Go to your business's Facebook, Twitter, and LinkedIn pages, copy the URL from your browser, and paste them into the `href` attributes.

## 5. SEO Schema Markup
The Contact page has hidden "Schema Markup" which tells Google about your business. It currently has dummy data (like `https://example.com`).

* **Where to change:** `src/pages/Contact.jsx` (Lines 63-79)
* **What to change:** Update the `url` field with your final live domain name, and ensure the address matches your real address perfectly.
* **How to get this:** Enter your final production website URL and your exact physical address.

## 5. Firebase Environment Variables & Security
Your app relies on Firebase for the database and admin authentication.

* **Where to change:** `.env` file in the root of your project.
* **What to change:** Ensure that the API keys inside your `.env` file belong to your **Production** Firebase project (not a test project).
* **How to get this:** Go to your [Firebase Console](https://console.firebase.google.com/), open Project Settings, and copy the Web App configuration keys. Remember that when you deploy (to Vercel, Netlify, etc.), you must manually enter these environment variables into your hosting provider's dashboard.
