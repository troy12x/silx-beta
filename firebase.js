// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD4XFQnuTs91G5YWTASLP1Q8swn6hQ3NIY",
    authDomain: "silx-ai-c7287.firebaseapp.com",
    projectId: "silx-ai-c7287",
    storageBucket: "silx-ai-c7287.appspot.com",
    messagingSenderId: "527085364040",
    appId: "1:527085364040:web:19f15915643f05aea5c97d",
    measurementId: "G-4MJ3K8YJ1T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };