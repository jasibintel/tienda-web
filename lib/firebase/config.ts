// Firebase Client Configuration
// This file contains the Firebase configuration for the client-side app

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Configuración extraída del proyecto Flutter anterior (tufecrecelibros)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate that all required environment variables are set
const missingVars: string[] = [];
if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');

if (missingVars.length > 0) {
    const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    const envSource = isProduction ? 'Vercel environment variables' : '.env.local file';
    console.error('❌ Firebase configuration is incomplete. Missing variables:', missingVars);
    console.error(`Please check your ${envSource}.`);
    console.error('Current environment:', {
        hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
        apiKey: firebaseConfig.apiKey ? '✅' : '❌',
        projectId: firebaseConfig.projectId ? '✅' : '❌',
        authDomain: firebaseConfig.authDomain ? '✅' : '❌',
    });
}

// Initialize Firebase (only once, and only on client-side)
let app;
try {
    if (typeof window !== 'undefined') {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    } else {
        // Server-side: create a minimal config
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    }
} catch (error: any) {
    console.error('❌ Error initializing Firebase:', error.message);
    throw error;
}

// Initialize Firebase services (only on client-side)
export const auth = typeof window !== 'undefined' ? getAuth(app) : null as any;
export const db = typeof window !== 'undefined' ? getFirestore(app) : null as any;
export const storage = typeof window !== 'undefined' ? getStorage(app) : null as any;

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
