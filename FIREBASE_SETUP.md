# Firebase Configuration Guide

This file explains how to set up Firebase for the "De Gloria en Gloria" project.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "de-gloria-libros" (or your preferred name)
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Firebase Services

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in **production mode**
4. Choose your location (us-central1 recommended)

#### Authentication
1. Go to Authentication
2. Click "Get started"
3. Enable these sign-in methods:
   - Email/Password
   - Google (optional)

#### Storage
1. Go to Storage
2. Click "Get started"
3. Start in **production mode**

### 3. Get Firebase Config (Client-side)

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" icon (</>) to add a web app
4. Register app with nickname "tienda-web"
5. Copy the `firebaseConfig` object

### 4. Get Service Account (Server-side)

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. **IMPORTANT**: Keep this file secure, never commit it

### 5. Create .env.local File

Create a file named `.env.local` in the `tienda-web` directory with this content:

```bash
# Client-side Firebase Config (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Server-side Firebase Admin Config (Private)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
```

Replace all `your_*` placeholders with your actual Firebase credentials.

### 6. Firestore Security Rules

Set up these security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Books collection - public read, admin write
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users collection - authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders collection - users can read their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    // Testimonials - public read, admin write
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Collections - public read, admin write
    match /collections/{collectionId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 7. Storage Security Rules

Set up these security rules in Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Book covers - public read, admin write
    match /covers/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Book files - authenticated users can read
    match /books/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // User uploads - users can read/write their own files
    match /users/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 8. Verify Setup

After setting up, restart your development server:

```bash
npm run dev
```

The Firebase connection should now be active!

## Files Created

- `lib/firebase/config.ts` - Client-side Firebase configuration
- `lib/firebase/admin.ts` - Server-side Firebase Admin SDK configuration

## Next Steps

1. Create Firestore collections (books, users, orders, etc.)
2. Upload book covers to Storage
3. Implement authentication flows
4. Test Firestore queries

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure `.env.local` file exists and has correct values
- Restart development server after creating `.env.local`

### "Firebase Admin: Error initializing Firebase Admin SDK"
- Check that `FIREBASE_PRIVATE_KEY` is properly formatted
- Make sure the private key includes `\n` characters (escaped newlines)

### "Permission denied" errors in Firestore
- Check your security rules
- Make sure user is authenticated for protected resources

## Security Best Practices

1. **Never commit** `.env.local` or service account JSON files
2. **Always use** environment variables for sensitive data
3. **Set up** proper security rules in Firestore and Storage
4. **Enable** App Check for production (optional but recommended)
5. **Rotate** service account keys periodically
