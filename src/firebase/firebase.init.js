
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1NNIWRGauHDXhe8TYYnzRlyFjILpyPxo",
  authDomain: "task-app-website.firebaseapp.com",
  projectId: "task-app-website",
  storageBucket: "task-app-website.appspot.com",
  messagingSenderId: "243751988308",
  appId: "1:243751988308:web:b1188cb582dc58f982d1c1"
};


const app = initializeApp(firebaseConfig);

export default app