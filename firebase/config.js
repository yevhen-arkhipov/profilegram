import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

function initializeAppIfNecessary() {
  try {
    return getApp({});
  } catch (any) {
    const firebaseConfig = {
      apiKey: 'AIzaSyA8_uU2frJT7rz-DKs0TRzttEYfr4NFtXU',
      authDomain: 'profilegram-82040.firebaseapp.com',
      projectId: 'profilegram-82040',
      storageBucket: 'profilegram-82040.appspot.com',
      messagingSenderId: '30535182610',
      appId: '1:30535182610:web:481ec03b6187adcb31abcb',
    };
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
