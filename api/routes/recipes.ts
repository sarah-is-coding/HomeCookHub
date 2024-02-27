//Note: _r suffix required to avoid typescript errors
const firebase_r = require('firebase/app')
const firestore_r = require('firebase/firestore')

var express = require('express');
var router = express.Router();


const firebaseConfig_r = {

  apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
  authDomain: "homecookhub-0.firebaseapp.com",
  projectId: "homecookhub-0",
  storageBucket: "homecookhub-0.appspot.com",
  messagingSenderId: "454367080500",
  appId: "1:454367080500:web:214319e1e98d2405021a61",
  measurementId: "G-FNCPSCNPP8"

};


const app_r = firebase_r.initializeApp(firebaseConfig_r)
const Database_r = firestore_r.getFirestore(app_r)

const recipeRef = firestore_r.collection(Database_r, 'recipes')

router.get("/", function(req, res, next) {
    var myQuery = firestore_r.query(recipeRef)

    firestore_r.getDocs(myQuery).then((snapshot) => {
        if(!snapshot.empty){
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          
          res.send(data);
        }
        else{
          res.status(404)
        }
    });

});

router.get("/:recipeID", function(req, res, next) {
  let docRef = firestore_r.doc(Database_r, 'recipes', req.params["recipeID"])

  try{

    firestore_r.getDoc(docRef).then((snapshot) =>{
      if(snapshot.exists()){
        res.send(snapshot.data())
      }
      else{
        res.status(404)
        res.send("404: Recipe not found")
      }
    })
  }
  catch(error){
    console.log(error)
  }
});


module.exports = router;