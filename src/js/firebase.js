import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJ7lkUyIxXOXjHtW6alWDMXhTyq-rUCcE",
    authDomain: "v-notes-ce070.firebaseapp.com",
    projectId: "v-notes-ce070",
    storageBucket: "v-notes-ce070.appspot.com",
    messagingSenderId: "703494586363",
    appId: "1:703494586363:web:68bc2c1fad1c261b8a955e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}