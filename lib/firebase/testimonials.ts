// Funciones para interactuar con testimonios en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { Testimonial } from '@/lib/types';

const TESTIMONIALS_COLLECTION = 'testimonials';

// Convertir documento a Testimonial
function docToTestimonial(docSnap: QueryDocumentSnapshot<DocumentData>): Testimonial {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        quote: data.quote,
        authorName: data.authorName,
        authorLocation: data.authorLocation,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true
    } as Testimonial;
}

// Obtener todos los testimonios activos
export async function getActiveTestimonials(): Promise<Testimonial[]> {
    try {
        const q = query(
            collection(db, TESTIMONIALS_COLLECTION),
            where('isActive', '==', true),
            orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToTestimonial);
    } catch (error) {
        console.error('Error getting testimonials:', error);
        throw error;
    }
}

// Obtener testimonio por ID
export async function getTestimonialById(id: string): Promise<Testimonial | null> {
    try {
        const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return null;
        }
        
        return docToTestimonial(docSnap as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting testimonial:', error);
        throw error;
    }
}

// Crear testimonio (solo admin)
export async function createTestimonial(testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    try {
        const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
            ...testimonialData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        const newTestimonial = await getTestimonialById(docRef.id);
        if (!newTestimonial) {
            throw new Error('Error al crear el testimonio');
        }
        return newTestimonial;
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
    }
}

// Actualizar testimonio (solo admin)
export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    try {
        const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, id);
        await updateDoc(testimonialRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        
        const updatedTestimonial = await getTestimonialById(id);
        if (!updatedTestimonial) {
            throw new Error('Error al actualizar el testimonio');
        }
        return updatedTestimonial;
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
}

// Eliminar testimonio (solo admin)
export async function deleteTestimonial(id: string): Promise<void> {
    try {
        const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, id);
        await deleteDoc(testimonialRef);
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
}

// Obtener todos los testimonios (admin)
export async function getAllTestimonials(): Promise<Testimonial[]> {
    try {
        const q = query(
            collection(db, TESTIMONIALS_COLLECTION),
            orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToTestimonial);
    } catch (error) {
        console.error('Error getting all testimonials:', error);
        throw error;
    }
}

