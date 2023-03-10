import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function initializeAppIfNecessary() {
  try {
    return getApp({});
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyBp59Y3zIggknbnKNpYEphVjKJBH7HMA48",
      authDomain: "profilegramapp.firebaseapp.com",
      databaseURL:
        "https://profilegramapp-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "profilegramapp",
      storageBucket: "profilegramapp.appspot.com",
      messagingSenderId: "833683349456",
      appId: "1:833683349456:web:a3c26467d36897b3b023d5",
      measurementId: "G-4TKF6QQC3Y",
    };
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
