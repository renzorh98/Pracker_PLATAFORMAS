import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyADjLxeUmKIaUaCdMsLMyzv_EoDgjS0yH0",
    authDomain: "fir-auth-2514c.firebaseapp.com",
    projectId: "fir-auth-2514c",
    storageBucket: "fir-auth-2514c.appspot.com",
    messagingSenderId: "559193698294",
    appId: "1:559193698294:web:b388951426d6ff52f561d7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
    return signOut(auth)
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}

export default getFirestore()