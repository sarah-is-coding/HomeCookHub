const firebase = require('firebase/app')
const firestore = require('firebase/firestore')

var express = require('express');
var router = express.Router();

const firebaseConfig = {

  apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
  authDomain: "homecookhub-0.firebaseapp.com",
  projectId: "homecookhub-0",
  storageBucket: "homecookhub-0.appspot.com",
  messagingSenderId: "454367080500",
  appId: "1:454367080500:web:214319e1e98d2405021a61",
  measurementId: "G-FNCPSCNPP8"

};

const app = firebase.initializeApp(firebaseConfig)
const Database = firestore.getFirestore(app)

const recipeRef = firestore.collection(Database, 'recipes')

router.get("/", function(req, res, next) {
    var myQuery = firestore.query(recipeRef, firestore.limit(10))

    firestore.getDocs(myQuery).then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        
        res.send(data);
    });
    
});

module.exports = router;