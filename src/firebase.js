import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwNoV1lA8Dp6GTrQqRj_na9DM_vRMvXD0",
    authDomain: "netflix-clone-50e6d.firebaseapp.com",
    projectId: "netflix-clone-50e6d",
    storageBucket: "netflix-clone-50e6d.appspot.com",
    messagingSenderId: "933175273590",
    appId: "1:933175273590:web:908ea17792efb9361e1757",
    measurementId: "G-Y3EDDWNB3P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;