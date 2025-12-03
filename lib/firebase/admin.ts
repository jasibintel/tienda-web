// Firebase Admin SDK Configuration
// This file is used for server-side operations (API routes, server components)

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin (only once, and only if credentials are available)
let adminInitialized = false;

if (getApps().length === 0 && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    try {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        adminInitialized = true;
    } catch (error) {
        console.warn('⚠️ Firebase Admin SDK no pudo inicializarse. Las credenciales pueden estar incompletas.');
        console.warn('Verifica tu archivo .env.local con las credenciales del Service Account.');
    }
}

// Export Admin services (only if initialized)
export const adminAuth = adminInitialized ? getAuth() : null as any;
export const adminDb = adminInitialized ? getFirestore() : null as any;
export const adminStorage = adminInitialized ? getStorage() : null as any;
