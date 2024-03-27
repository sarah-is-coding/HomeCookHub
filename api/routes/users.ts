//Note: _u suffix required to avoid typescrit errors

import { arrayRemove, arrayUnion, setDoc, updateDoc } from "firebase/firestore";

const firebase_u = require('firebase/app');
const firestore_u = require('firebase/firestore');

var express = require('express');
var router = express.Router();

const firebaseConfig_u = {

  apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
  authDomain: "homecookhub-0.firebaseapp.com",
  projectId: "homecookhub-0",
  storageBucket: "homecookhub-0.appspot.com",
  messagingSenderId: "454367080500",
  appId: "1:454367080500:web:214319e1e98d2405021a61",
  measurementId: "G-FNCPSCNPP8"

};

interface savedRecipe {
  recipe_id: String,
  recipe_title: String,
  saved_date: any
};

interface mealPlanEntry {
  day: any,
  meal: String,
  recipe_id: String,
  recipe_title: String
};

interface ingredientInfo {
  name: String,
  quantity: Number,
  unit: String
};

const app_u = firebase_u.initializeApp(firebaseConfig_u)
const Database_u = firestore_u.getFirestore(app_u)

const userRef = firestore_u.collection(Database_u, 'users')

//GET user data
router.get('/:username', function(req, res, next) {
  var myQuery = firestore_u.query(userRef, firestore_u.where("Username", "==", req.params["username"]))

  try{
    firestore_u.getDocs(myQuery).then((snapshot) =>{
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
  
  const startTimestamp = firestore_u.Timestamp.fromDate(day);
  const endTimestamp = firestore_u.Timestamp.fromDate(endDay);

  console.log(startTimestamp);
  console.log(endTimestamp);

  var myQuery = firestore_u.query(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'),
                            firestore_u.where('day', '>=', startTimestamp),
                            firestore_u.where('day', '<=', endTimestamp));
  


  try{
    firestore_u.getDocs(myQuery).then((snapshot) =>{
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
  
  const startTimestamp = firestore_u.Timestamp.fromDate(day);
  const endTimestamp = firestore_u.Timestamp.fromDate(endDay);

  console.log(startTimestamp);
  console.log(endTimestamp);

  var myQuery = firestore_u.query(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'),
                            firestore_u.where('day', '>=', startTimestamp),
                            firestore_u.where('day', '<=', endTimestamp));
  


  try{
    firestore_u.getDocs(myQuery).then((snapshot) =>{
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

//PUT: Add a recipe to a user's saved recipes
router.put('/save_recipe/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if(req.body['recipe_id'] && req.body['recipe_title']){

      const recipe: savedRecipe = {
        recipe_id: String(req.body['recipe_id']),
        recipe_title: String(req.body['recipe_title']),
        saved_date: firestore_u.Timestamp.fromDate(new Date()),
      };
      
      console.log(recipe);

      const userRecipeRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRecipeRef, {
        Saved_Recipes: arrayUnion(recipe)
      }).then(() => {
        res.status(200).send(`Recipe ${String(req.body['recipe_id'])} saved to ${req.params["username"]}`);
      });
    }
    else{
      res.status(400).send("One or more required inputs is not defined");
    }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Recipe could not be saved');
  }

});

//PUT: Remove a recipe from a user's saved recipes
router.put('/remove_recipe/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if( req.body['recipe_id'] && req.body['recipe_title'] && Number.isInteger(Number(req.body['saved_sec'])) 
        && Number.isInteger(Number(req.body['saved_nanosec']))){

      const recipe: savedRecipe = {
        recipe_id: String(req.body['recipe_id']),
        recipe_title: String(req.body['recipe_title']),
        saved_date: new firestore_u.Timestamp(Number(req.body['saved_sec']), Number(req.body['saved_nanosec'])),
      }
      
      console.log(recipe);

      const userRecipeRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRecipeRef, {
        Saved_Recipes: arrayRemove(recipe)
      }).then(() => {
        res.status(200).send(`Recipe ${String(req.body['recipe_id'])} removed from ${req.params["username"]}`);
      });
  }
  else{
    res.status(400).send("One or more required inputs is not defined");
  }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Recipe could not be removed');
  }

});

//POST: Add a recipe to a user's meal plan
router.post('/save_meal/:username', function(req, res, next) {
  try{
    if(req.body['day'] && req.body['meal'] && req.body['recipe_id'] && req.body['recipe_title']){

      const recipe: mealPlanEntry = {
        day: firestore_u.Timestamp.fromDate(new Date(req.body['day'])),
        meal: String(req.body['meal']),
        recipe_id: String(req.body['recipe_id']),
        recipe_title: String(req.body['recipe_title'])
      }

      console.log(recipe);

      firestore_u.addDoc(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'), recipe).then(() => {
        res.status(200).send(`Recipe saved to the mealplan of ${req.params["username"]}`);
      });

    }
    else{
      res.status(400).send("One or more required inputs is not defined");    
    }

  }catch(error){
    console.log(error);
    res.status(400).send('Error: Meal Plan entry could not be saved');
  }
});

//DELETE: Remove a recipe from a user's meal plan
router.delete('/remove_meal', function(req, res, next) {
  const day = new Date(Number(req.body["year"]), Number(req.body["month"]) - 1, Number(req.body["day"]));
  const endDay = new Date(Number(req.body["year"]), Number(req.body["month"]) - 1, Number(req.body["day"]) + 1);
  
  const startTimestamp = firestore_u.Timestamp.fromDate(day);
  const endTimestamp = firestore_u.Timestamp.fromDate(endDay);

  console.log(startTimestamp);
  console.log(endTimestamp);

  var myQuery = firestore_u.query(firestore_u.collection(Database_u, 'users', req.body["username"], 'mealplans'),
                            firestore_u.where('day', '>=', startTimestamp),
                            firestore_u.where('day', '<=', endTimestamp),
                            firestore_u.where('recipe_id', '==', req.body["recipe_id"]),
                            firestore_u.where('meal', '==', req.body["meal"]));
  
  try{
    firestore_u.getDocs(myQuery).then((snapshot) => {
      snapshot.forEach(doc => {
        firestore_u.deleteDoc(doc.ref);
      });
    });

    res.status(200).send(`${req.body["meal"]} entry with recipe id ${req.body["recipe_id"]} deleted from ${req.body["month"]}/${req.body["day"]}/${req.body["year"]}`);

  }catch(error){
    console.log(error);
    res.status(400).send('Error: Meal Plan entry could not be deleted');
  }
});

//PUT: Add pantry item
router.put('/add_pantry/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if(req.body['name'] && Number.isInteger(Number(req.body['quantity'])) && req.body['unit']){

      const item: ingredientInfo = {
        name: String(req.body['name']),
        quantity: Number(req.body['quantity']),
        unit: String(req.body['unit'])
      }
      
      console.log(item);

      const userRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRef, {
        Pantry_Items: arrayUnion(item)
      }).then(() => {
        res.status(200).send(`${String(req.body['name'])} saved to ${req.params['username']}'s pantry items.`);
      });
  }
  else{
    res.status(400).send("One or more required inputs is not defined");
  }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Item could not be saved to the pantry.');
  }
});

//PUT: Remove pantry item
router.put('/remove_pantry/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if(req.body['name'] && Number.isInteger(Number(req.body['quantity'])) && req.body['unit']){

      const item: ingredientInfo = {
        name: String(req.body['name']),
        quantity: Number(req.body['quantity']),
        unit: String(req.body['unit'])
      }
      
      console.log(item);

      const userRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRef, {
        Pantry_Items: arrayRemove(item)
      }).then(() => {
        res.status(200).send(`${String(req.body['name'])} was removed ${req.params['username']}'s pantry items.`);
      });
  }
  else{
    res.status(400).send("One or more required inputs is not defined");
  }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Item could not be removed from pantry.');
  }
});

//PUT: Add grocery list item
router.put('/add_grocery/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if(req.body['name'] && Number.isInteger(Number(req.body['quantity'])) && req.body['unit']){

      const item: ingredientInfo = {
        name: String(req.body['name']),
        quantity: Number(req.body['quantity']),
        unit: String(req.body['unit'])
      }
      
      console.log(item);

      const userRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRef, {
        Grocery_List: arrayUnion(item)
      }).then(() => {
        res.status(200).send(`${String(req.body['name'])} saved to ${req.params["username"]}'s Grocery List.`);
      });
  }
  else{
    res.status(400).send("One or more required inputs is not defined");
  }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Item could not be saved to the Grocery List');
  }

});

//PUT: Remove grocery list item
router.put('/remove_grocery/:username', function(req, res, next) {
  try{
    //check that all required inputs are submitted
    if(req.body['name'] && Number.isInteger(Number(req.body['quantity'])) && req.body['unit']){

      const item: ingredientInfo = {
        name: String(req.body['name']),
        quantity: Number(req.body['quantity']),
        unit: String(req.body['unit'])
      }
      
      console.log(item);

      const userRef = firestore_u.doc(Database_u, "users", req.params['username']);

      firestore_u.updateDoc(userRef, {
        Grocery_List: arrayRemove(item)
      }).then(() => {
        res.status(200).send(`${String(req.body['name'])} was removed from ${req.params["username"]}'s Grocery List.`);
      });
  }
  else{
    res.status(400).send("One or more required inputs is not defined");
  }  

  }
  catch(error){
    console.log(error);
    res.status(400).send('Error: Item could not be removed from the Grocery List');
  }

});

module.exports = router;
