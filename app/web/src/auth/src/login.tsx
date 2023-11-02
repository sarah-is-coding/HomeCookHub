import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "./config";

initializeApp(firebaseApp);

const auth = getAuth();

connectAuthEmulator(auth, "http://localhost:5000");

function loginEmailPassword() {
  console.log("Hello");
  signInWithEmailAndPassword(auth, email, password);
}

function createAccount() {
  createUserWithEmailAndPassword(auth, email, password);
}

function logOut() {
  signOut(auth);
}

const email = (document.getElementById("email") as HTMLInputElement).value;
const password = (document.getElementById("password") as HTMLInputElement).value;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const createAccountBtn = document.getElementById(
  "createAccountBtn"
) as HTMLButtonElement;
const LogoutBtn = document.getElementById("LogoutBtn") as HTMLButtonElement;

loginBtn.addEventListener("click", loginEmailPassword, false);
createAccountBtn.addEventListener("click", createAccount, false);
LogoutBtn.addEventListener("click", logOut, false);
