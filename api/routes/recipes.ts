import { collection } from "firebase/firestore";

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

interface newRecipe {
  author: String,
  cook_time: Number,
  date: any,
  ingredients: any,
  prep_time: Number,
  quantities: any,
  serving_size: Number,
  steps: any,
  tags: any,
  title: string,
  units: any
};


const app_r = firebase_r.initializeApp(firebaseConfig_r)
const Database_r = firestore_r.getFirestore(app_r)

const recipeRef = firestore_r.collection(Database_r, 'recipes')


//GET: retrieve all recipes
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


//GET: retrieve a recipe based on its recipeID
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

//POST: Add a new recipe to the Database
router.post("/add_recipe", function(req, res, next){
  try{
    //DATA PREPROCESSING
    let new_id;

    let new_ingredients = JSON.parse(req.body['ingredients']);
    let new_quantities = JSON.parse(req.body['quantities']);
    let new_steps = JSON.parse(req.body['steps']);
    let new_tags = JSON.parse(req.body['tags']);
    let new_units = JSON.parse(req.body['units']);

    firestore_r.getCountFromServer(firestore_r.collection(Database_r, 'recipes')).then((snapshot) => {
      console.log(snapshot.data().count)
      new_id = snapshot.data().count + 1;
      console.log(new_id);

      console.log(req.body['title']);
      console.log(new_id);
      console.log(req.body['author']);
      console.log(req.body['cook_time']);
      console.log(req.body['prep_time']);
      console.log(req.body['serving_size']);
      console.log(req.body['ingredients']);
      console.log(req.body['quantities']);
      console.log(req.body['units']);
      console.log(req.body['steps']);
      console.log(req.body['tags']);
      
  
      if(req.body['author'] && Number.isInteger(Number(req.body['cook_time'])) && Number.isInteger(Number(req.body['prep_time']))
          && Number.isInteger(Number(req.body['serving_size'])) && req.body['title'] && new_id
          && req.body['ingredients'] && req.body['quantities'] && req.body['steps'] && req.body['tags']
          && req.body['units']){
        const newRecipe = {
          author: String(req.body['author']),
          cook_time: Number(req.body['cook_time']),
          date: firestore_r.Timestamp.fromDate(new Date()),
          //id: new_id,
          ingredients: new_ingredients,
          prep_time: Number(req.body['prep_time']),
          quantities: new_quantities,
          serving_size: Number(req.body['serving_size']),
          steps: new_steps,
          tags: new_tags,
          title: String(req.body['title']),
          units: new_units
        };

        //let new_recipe_ref = firestore_r.doc(Database_r, 'recipes', String(new_id));

        firestore_r.addDoc(firestore_r.collection(Database_r, 'recipes'), newRecipe).then(() => {
          res.status(200).send(`Recipe saved to to database with id of ${new_id}`);
        });
  
      }
      else{
        res.status(400).send("One or more required inputs is not defined");
      }
    });

  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;