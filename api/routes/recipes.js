"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
//Note: _r suffix required to avoid typescript errors
var firebase_r = require('firebase/app');
var firestore_r = require('firebase/firestore');
var express = require('express');
var router = express.Router();
var firebaseConfig_r = {
    apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
    authDomain: "homecookhub-0.firebaseapp.com",
    projectId: "homecookhub-0",
    storageBucket: "homecookhub-0.appspot.com",
    messagingSenderId: "454367080500",
    appId: "1:454367080500:web:214319e1e98d2405021a61",
    measurementId: "G-FNCPSCNPP8"
};
;
var app_r = firebase_r.initializeApp(firebaseConfig_r);
var Database_r = firestore_r.getFirestore(app_r);
var recipeRef = firestore_r.collection(Database_r, 'recipes');
//GET: retrieve all recipes
router.get("/", function (req, res, next) {
    var myQuery = firestore_r.query(recipeRef);
    firestore_r.getDocs(myQuery).then(function (snapshot) {
        if (!snapshot.empty) {
            var data = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
            res.send(data);
        }
        else {
            res.status(404);
        }
    });
});
//GET: retrieve a recipe based on its recipeID
router.get("/:recipeID", function (req, res, next) {
    var docRef = firestore_r.doc(Database_r, 'recipes', req.params["recipeID"]);
    try {
        firestore_r.getDoc(docRef).then(function (snapshot) {
            if (snapshot.exists()) {
                res.send(snapshot.data());
            }
            else {
                res.status(404);
                res.send("404: Recipe not found");
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//POST: Add a new recipe to the Database
router.post("/add_recipe", function (req, res, next) {
    try {
        console.log(req.body)
        //DATA PREPROCESSING
        var new_id_1;
        var new_ingredients_1 = req.body['ingredients'];
        var new_quantities_1 = req.body['quantities'];
        var new_steps_1 = req.body['steps'];
        var new_tags_1 = req.body['tags'];
        var new_units_1 = req.body['units'];
        firestore_r.getCountFromServer(firestore_r.collection(Database_r, 'recipes')).then(function (snapshot) {
            console.log(snapshot.data().count);
            new_id_1 = snapshot.data().count + 1;
            console.log(new_id_1);
            console.log(req.body['title']);
            console.log(new_id_1);
            console.log(req.body['author']);
            console.log(req.body['cook_time']);
            console.log(req.body['prep_time']);
            console.log(req.body['serving_size']);
            console.log(req.body['ingredients']);
            console.log(req.body['quantities']);
            console.log(req.body['units']);
            console.log(req.body['steps']);
            console.log(req.body['tags']);
            if (req.body['author'] && Number.isInteger(Number(req.body['cook_time'])) && Number.isInteger(Number(req.body['prep_time']))
                && Number.isInteger(Number(req.body['serving_size'])) && req.body['title'] && new_id_1
                && req.body['ingredients'] && req.body['quantities'] && req.body['steps'] && req.body['tags']
                && req.body['units']) {
                var newRecipe = {
                    author: String(req.body['author']),
                    cook_time: Number(req.body['cook_time']),
                    date: firestore_r.Timestamp.fromDate(new Date()),
                    //id: new_id,
                    ingredients: new_ingredients_1,
                    prep_time: Number(req.body['prep_time']),
                    quantities: new_quantities_1,
                    serving_size: Number(req.body['serving_size']),
                    steps: new_steps_1,
                    tags: new_tags_1,
                    title: String(req.body['title']),
                    units: new_units_1
                };
                //let new_recipe_ref = firestore_r.doc(Database_r, 'recipes', String(new_id));
                firestore_r.addDoc(firestore_r.collection(Database_r, 'recipes'), newRecipe).then(function () {
                    res.status(200).send("Recipe saved to to database with id of ".concat(new_id_1));
                });
            }
            else {
                res.status(400).send("One or more required inputs is not defined");
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = router;