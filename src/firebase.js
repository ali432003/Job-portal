import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyApjKsMctgcDGGiVuXSaYeZLGmKnOhWjRk",
  authDomain: "fir-authentication-745c8.firebaseapp.com",
  projectId: "fir-authentication-745c8",
  storageBucket: "fir-authentication-745c8.appspot.com",
  messagingSenderId: "728574391668",
  appId: "1:728574391668:web:780a00f7b6e097feb9e821",
  databaseURL: "https://fir-authentication-745c8-default-rtdb.firebaseio.com/"
  
};

// Initialize Firebase , Auth , Storage , DataBase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const imgDB = getStorage(app)
const db = getDatabase(app);

export {app , auth , imgDB , db};
