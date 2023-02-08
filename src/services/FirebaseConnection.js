import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCbN_rKybI3xemWm7aKOulgjvENGsMWcFM",
  authDomain: "sistema-de-emprestimos-4b2e8.firebaseapp.com",
  projectId: "sistema-de-emprestimos-4b2e8",
  storageBucket: "sistema-de-emprestimos-4b2e8.appspot.com",
  messagingSenderId: "164894593803",
  appId: "1:164894593803:web:a54a0073bc0d5f3752c80e",
  measurementId: "G-1675VV6BX1"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };