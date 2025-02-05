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
```
 "dependencies": {
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "^5.64.2",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "sweetalert2": "^11.15.10"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.23",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "postcss": "^8.5.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.10",
    "react-router-dom": "^7.1.3",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.5"
  }
```

## Project Live Link
[Study House](https://bistro-boss-86657.web.app/)

