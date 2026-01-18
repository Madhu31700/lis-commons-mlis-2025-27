// Firebase core
import { initializeApp } from "firebase/app"

// Firebase services we use
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// 🔴 REPLACE THESE WITH YOUR OWN VALUES
const firebaseConfig = {
  apiKey: "AIzaSyDZAKMFiC1kN_T_R4gKHbRKJPKYmAqr-3U",
  authDomain: "librandhana.firebaseapp.com",
  projectId: "librandhana",
  storageBucket: "librandhana.firebasestorage.app",
  messagingSenderId: "502570704760",
  appId: "1:502570704760:web:8d25e208dedc654258b28d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export services
export const auth = getAuth(app)
export const db = getFirestore(app)
