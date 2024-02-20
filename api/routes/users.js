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

const userRef = firestore.collection(Database, 'users')

//GET user data
router.get('/:username', function(req, res, next) {
  var myQuery = firestore.query(userRef, firestore.where("Username", "==", req.params["username"]))

  try{
    firestore.getDocs(myQuery).then((snapshot) =>{
      if(!snapshot.empty){
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))

        res.send(data)
      }
      else{
        res.status(404)
        res.send("404: User not found")
      }
    })

  }
  catch(error){
    console.log(error)
  }
});

//GET Meal Plan Entries (Single Date)
router.get('/:username/:month(\\d\\d)/:day(\\d\\d)/:year(\\d\\d\\d\\d)', function(req, res, next){
  const day = new Date(req.params["year"], req.params["month"] - 1, req.params["day"]);
  const endDay = new Date(Number(req.params["year"]), Number(req.params["month"]) - 1, Number(req.params["day"]) + 1);
  
  const startTimestamp = firestore.Timestamp.fromDate(day);
  const endTimestamp = firestore.Timestamp.fromDate(endDay);

  console.log(startTimestamp);
  console.log(endTimestamp);

  var myQuery = firestore.query(firestore.collection(Database, 'users', req.params["username"], 'mealplans'),
                            firestore.where('day', '>=', startTimestamp),
                            firestore.where('day', '<=', endTimestamp));
  


  try{
    firestore.getDocs(myQuery).then((snapshot) =>{
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      res.send(data);
    });

  }
  catch(error){
    console.log(error);
  }
});

//GET Meal Plan Entries (DateRange)
router.get('/:username/:month(\\d\\d)/:day(\\d\\d)/:year(\\d\\d\\d\\d)/:month2(\\d\\d)/:day2(\\d\\d)/:year2(\\d\\d\\d\\d)', function(req, res, next){
  const day = new Date(req.params["year"], req.params["month"] - 1, req.params["day"]);
  const endDay = new Date(Number(req.params["year2"]), Number(req.params["month2"]) - 1, Number(req.params["day2"]) + 1);
  
  const startTimestamp = firestore.Timestamp.fromDate(day);
  const endTimestamp = firestore.Timestamp.fromDate(endDay);

  console.log(startTimestamp);
  console.log(endTimestamp);

  var myQuery = firestore.query(firestore.collection(Database, 'users', req.params["username"], 'mealplans'),
                            firestore.where('day', '>=', startTimestamp),
                            firestore.where('day', '<=', endTimestamp));
  


  try{
    firestore.getDocs(myQuery).then((snapshot) =>{
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      res.send(data);
    });

  }
  catch(error){
    console.log(error);
  }
});

//TODO: Write Saved Recipes

module.exports = router;
