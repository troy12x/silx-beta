// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCFL8iVS2yO3cp-dvPn_FBA_-rYPN5akP0",
    authDomain: "silx-ai-individuals.firebaseapp.com",
    projectId: "silx-ai-individuals",
    storageBucket: "silx-ai-individuals.appspot.com",
    messagingSenderId: "1066572703243",
    appId: "1:1066572703243:web:42130766705deb41b5c90e",
    measurementId: "G-VJ04P1MN51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };