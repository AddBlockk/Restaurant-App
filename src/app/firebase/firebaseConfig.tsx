import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJCjgrlQ93mYQ6Em5WGioeEd6bTjpMW2M",
  authDomain: "restaurant-app-boltach.firebaseapp.com",
  databaseURL:
    "https://restaurant-app-boltach-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "restaurant-app-boltach",
  storageBucket: "restaurant-app-boltach.appspot.com",
  messagingSenderId: "88194177268",
  appId: "1:88194177268:web:d260725f73d49fa0fbe6a1",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

const auth = getAuth(app);

export { app, auth, database };
