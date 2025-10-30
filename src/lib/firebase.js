import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCmt7fZrinFgBaebHZH5zxshz6wTE2ksCg",
  authDomain: "portfolio-mm-af46f.firebaseapp.com",
  projectId: "portfolio-mm-af46f",
  storageBucket: "portfolio-mm-af46f.firebasestorage.app",
  messagingSenderId: "781200310067",
  appId: "1:781200310067:web:c491fe64d492a54433c846"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app); 


export { db, auth };
