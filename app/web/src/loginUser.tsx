import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
  authDomain: "homecookhub-0.firebaseapp.com",
  projectId: "homecookhub-0",
  storageBucket: "homecookhub-0.appspot.com",
  messagingSenderId: "454367080500",
  appId: "1:454367080500:web:214319e1e98d2405021a61",
  measurementId: "G-FNCPSCNPP8"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInWithEmailAndPassword(auth, "test_email@testmail.org", "test_user")
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)

  });