import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_vgq9sm0AuIV6TII_puQI6u5KvfyL-p0",
    authDomain: "silx-ai-demo.firebaseapp.com",
    projectId: "silx-ai-demo",
    storageBucket: "silx-ai-demo.appspot.com",
    messagingSenderId: "642133821733",
    appId: "1:642133821733:web:07098f6ab464a1e6acf2cc",
    measurementId: "G-J9515DCVK2"
};

// Initialize Firebase
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };