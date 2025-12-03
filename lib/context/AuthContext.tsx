'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName?: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                
                // Verificar si el usuario es admin (custom claim)
                try {
                    // Forzar refrescar el token para obtener los custom claims más recientes
                    await firebaseUser.getIdToken(true);
                    const idTokenResult = await firebaseUser.getIdTokenResult();
                    const adminClaim = idTokenResult.claims.admin === true;
                    setIsAdmin(adminClaim);
                    
                    console.log('🔐 Auth state changed:', {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        isAdmin: adminClaim,
                        claims: idTokenResult.claims
                    });
                    
                    if (!adminClaim) {
                        console.warn('⚠️ Usuario no es admin. Si acabas de establecer el custom claim:');
                        console.warn('   1. Cierra sesión completamente');
                        console.warn('   2. Vuelve a iniciar sesión');
                        console.warn('   3. El token se actualizará con el claim admin: true');
                    }
                } catch (error: any) {
                    console.error('Error al obtener token:', error);
                    setIsAdmin(false);
                }
                
                // Crear o actualizar documento de usuario en Firestore
                await createOrUpdateUserDocument(firebaseUser, isAdmin);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const createOrUpdateUserDocument = async (firebaseUser: User, isAdminUser: boolean) => {
        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Crear nuevo documento de usuario
                await setDoc(userRef, {
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || '',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    role: isAdminUser ? 'admin' : 'user'
                });
            } else {
                // Actualizar documento existente
                await setDoc(userRef, {
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || userDoc.data().displayName,
                    photoURL: firebaseUser.photoURL || userDoc.data().photoURL,
                    role: isAdminUser ? 'admin' : (userDoc.data().role || 'user'),
                    updatedAt: serverTimestamp()
                }, { merge: true });
            }
        } catch (error) {
            console.error('Error creating/updating user document:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error.code));
        }
    };

    const register = async (email: string, password: string, displayName?: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            if (displayName) {
                await updateProfile(userCredential.user, { displayName });
            }

            // El documento de usuario se creará automáticamente en el useEffect
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error.code));
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            throw new Error('Error al cerrar sesión');
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error.code));
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error.code));
        }
    };

    const updateUserProfile = async (displayName: string, photoURL?: string) => {
        if (!user) throw new Error('Usuario no autenticado');
        
        try {
            await updateProfile(user, { displayName, photoURL: photoURL || user.photoURL });
            // Actualizar también en Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                displayName,
                photoURL: photoURL || user.photoURL,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (error: any) {
            throw new Error('Error al actualizar perfil');
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        login,
        register,
        logout,
        resetPassword,
        loginWithGoogle,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

function getAuthErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/email-already-in-use': 'Este correo ya está registrado',
        'auth/weak-password': 'La contraseña es muy débil',
        'auth/invalid-email': 'Correo electrónico inválido',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
        'auth/popup-closed-by-user': 'Ventana cerrada por el usuario',
        'auth/cancelled-popup-request': 'Solicitud cancelada'
    };

    return errorMessages[errorCode] || 'Error de autenticación';
}

