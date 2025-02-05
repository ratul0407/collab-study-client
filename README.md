# 📚 Study House

Study House is an online educational platform that enables teachers to upload, manage, and share learning materials with students. Students can book sessions—both free and paid—to access exclusive materials. The platform integrates secure payment processing through Stripe and handles user authentication via Firebase.

## Project Preview
![Screenshot (44)](https://github.com/user-attachments/assets/776a1423-50ff-41f7-ade0-983be71bbb49)
## Features
- Teacher Dashboard: Add, update, and delete sessions and materials.
- Student Access: Book sessions to access learning materials.
- Session Management: Sessions can be categorized as free or paid.
- Secure Payments: Integrated with Stripe for handling payments.
- Admin Panel: Manage all sessions and materials, including price adjustments.

- Authentication: Secure login and registration powered by Firebase.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Backend:** NodeJS, Mongodb, JWT, Stripe
- **State Management:** React Query, React Hook Form
- **Authentication:** Firebase
- **Payments:** Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **Utilities:** Axios, Date-fns, SweetAlert2, React Icons
- **Tooling:** ESLint, Prettier, PostCSS

## Installation

**Clone the Repo**
```
git clone https://github.com/ratul0407/collab-study-client.git

```

**go to the folder**
```
cd study-collab-client
```

** Create an `env.local` file in this format

```
VITE_apiKey=_your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=_firebase_projectID
VITE_storageBucket=_firebas_storage_buket
VITE_messagingSenderId=_firebase_messagingSenerID
VITE_appId=_firebase_app_id
VITE_PAYMENT_PK_KEY=Stripe_pk_key
VITE_API_URL=_localhost_url
VITE_IMG_HOSTING_KEY=_Imgbb_img_hosting_key
```
**And then run**
```
npm install
npm run dev
```

## Dependencies used
- React JS
- Axios
- date-fns
- Firebase
- Tanstack-query
- react-hook-form
- react-hot-toast
- react-icons
- sweetalert2
- react stripe-js
- daisyui
- tailwindcss
- autoprefixer
- postcss



## Project Live Link
[Study House](https://bistro-boss-86657.web.app/)

