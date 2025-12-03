#!/bin/bash
# Script para agregar variables de entorno a Vercel

echo "🔑 Agregando variables de entorno a Vercel..."
echo ""

# Variables de Firebase (valores del proyecto)
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production preview development <<< "AIzaSyDLcUAeVdCeu3Wa_aIZ9as9pyTks5h2wik"
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production preview development <<< "tufecrecelibros.firebaseapp.com"
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production preview development <<< "tufecrecelibros"
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production preview development <<< "tufecrecelibros.firebasestorage.app"
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production preview development <<< "144930929084"
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production preview development <<< "1:144930929084:web:84c2fc0421b3375f23d3b9"
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production preview development <<< "G-HVFT74SC2T"

echo ""
echo "✅ Variables de entorno agregadas!"
echo "🚀 Ahora puedes desplegar con: vercel --prod"

