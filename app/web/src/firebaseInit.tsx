import { getFirestore, connectFirestoreEmulator, doc, setDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';


const firebaseinit = () => {
    const firebaseApp = initializeApp({
    apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
    authDomain: "homecookhub-0.firebaseapp.com",
    projectId: "homecookhub-0",
    storageBucket: "homecookhub-0.appspot.com",
    messagingSenderId: "454367080500",
    appId: "1:454367080500:web:214319e1e98d2405021a61",
    measurementId: "G-FNCPSCNPP8",
    });

    const db = getFirestore(firebaseApp);
    connectFirestoreEmulator(db, '127.0.0.1', 8080);

    setDoc(doc(db, "recipes", "1"), {
        title: "Leftover Mashed Potato Bake",
        description: "Delicious and easy to make",
        image: "/assets/mashed-potatoes.png",
        rating: 4.5,
        reviewers: "5k"});
    setDoc(doc(db, "recipes", "2"), {
        title: "",
        description: "",
        image: "",
        rating: 4.5,
        reviewers: ""});

}
export default firebaseinit