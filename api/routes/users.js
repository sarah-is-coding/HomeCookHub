"use strict";
//Note: _u suffix required to avoid typescrit errors
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
var firestore_1 = require("firebase/firestore");
var firebase_u = require('firebase/app');
var firestore_u = require('firebase/firestore');
var express = require('express');
var router = express.Router();
var firebaseConfig_u = {
    apiKey: "AIzaSyDGgxcZliGnzZa_K2PZ4sc5bdrOjPAu5Ro",
    authDomain: "homecookhub-0.firebaseapp.com",
    projectId: "homecookhub-0",
    storageBucket: "homecookhub-0.appspot.com",
    messagingSenderId: "454367080500",
    appId: "1:454367080500:web:214319e1e98d2405021a61",
    measurementId: "G-FNCPSCNPP8"
};
;
var app_u = firebase_u.initializeApp(firebaseConfig_u);
var Database_u = firestore_u.getFirestore(app_u);
var userRef = firestore_u.collection(Database_u, 'users');
//GET user data
router.get('/:username', function (req, res, next) {
    var myQuery = firestore_u.query(userRef, firestore_u.where("Username", "==", req.params["username"]));
    try {
        firestore_u.getDocs(myQuery).then(function (snapshot) {
            if (!snapshot.empty) {
                var data = snapshot.docs.map(function (doc) { return (__assign({}, doc.data())); });
                res.send(data);
            }
            else {
                res.status(404);
                res.send("404: User not found");
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//GET Meal Plan Entries (Single Date)
router.get('/:username/:month(\\d\\d)/:day(\\d\\d)/:year(\\d\\d\\d\\d)', function (req, res, next) {
    var day = new Date(req.params["year"], req.params["month"] - 1, req.params["day"]);
    var endDay = new Date(Number(req.params["year"]), Number(req.params["month"]) - 1, Number(req.params["day"]) + 1);
    var startTimestamp = firestore_u.Timestamp.fromDate(day);
    var endTimestamp = firestore_u.Timestamp.fromDate(endDay);
    console.log(startTimestamp);
    console.log(endTimestamp);
    var myQuery = firestore_u.query(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'), firestore_u.where('day', '>=', startTimestamp), firestore_u.where('day', '<=', endTimestamp));
    try {
        firestore_u.getDocs(myQuery).then(function (snapshot) {
            var data = snapshot.docs.map(function (doc) { return (__assign({}, doc.data())); });
            res.send(data);
        });
    }
    catch (error) {
        console.log(error);
    }
});
//GET Meal Plan Entries (DateRange)
router.get('/:username/:month(\\d\\d)/:day(\\d\\d)/:year(\\d\\d\\d\\d)/:month2(\\d\\d)/:day2(\\d\\d)/:year2(\\d\\d\\d\\d)', function (req, res, next) {
    var day = new Date(req.params["year"], req.params["month"] - 1, req.params["day"]);
    var endDay = new Date(Number(req.params["year2"]), Number(req.params["month2"]) - 1, Number(req.params["day2"]) + 1);
    var startTimestamp = firestore_u.Timestamp.fromDate(day);
    var endTimestamp = firestore_u.Timestamp.fromDate(endDay);
    console.log(startTimestamp);
    console.log(endTimestamp);
    var myQuery = firestore_u.query(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'), firestore_u.where('day', '>=', startTimestamp), firestore_u.where('day', '<=', endTimestamp));
    try {
        firestore_u.getDocs(myQuery).then(function (snapshot) {
            var data = snapshot.docs.map(function (doc) { return (__assign({}, doc.data())); });
            res.send(data);
        });
    }
    catch (error) {
        console.log(error);
    }
});
//PUT: Add a recipe to a user's saved recipes
router.put('/save_recipe/:username', function (req, res, next) {
    try {
        //check that all required inputs are submitted
        if (req.body['cook_time'] && req.body['prep_time'] && req.body['recipe_id']
            && req.body['recipe_title'] && req.body['serving_size']) {
            var recipe = {
                cook_time: Number(req.body['cook_time']),
                prep_time: Number(req.body['prep_time']),
                recipe_id: String(req.body['recipe_id']),
                recipe_title: String(req.body['recipe_title']),
                saved_date: firestore_u.Timestamp.fromDate(new Date()),
                serving_size: Number(req.body['serving_size'])
            };
            console.log(recipe);
            var userRecipeRef = firestore_u.doc(Database_u, "users", req.params['username']);
            firestore_u.updateDoc(userRecipeRef, {
                Saved_Recipes: (0, firestore_1.arrayUnion)(recipe)
            }).then(function () {
                res.status(200).send("Recipe ".concat(String(req.body['recipe_id']), " saved to ").concat(req.params["username"]));
            });
        }
        else {
            res.status(400).send("One or more required inputs is not defined");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error: Recipe could not be saved');
    }
});
//POST: Add a recipe to a user's meal plan
router.post('/save_meal/:username', function (req, res, next) {
    try {
        if (req.body['cook_time'] && req.body['prep_time'] && req.body['day'] &&
            req.body['meal'] && req.body['recipe_id'] && req.body['recipe_title'] &&
            req.body['serving_size']) {
            var recipe = {
                cook_time: Number(req.body['cook_time']),
                prep_time: Number(req.body['prep_time']),
                day: firestore_u.Timestamp.fromDate(new Date(req.body['day'])),
                meal: String(req.body['meal']),
                recipe_id: String(req.body['recipe_id']),
                recipe_title: String(req.body['recipe_title']),
                serving_size: Number(req.body['serving_size'])
            };
            console.log(recipe);
            firestore_u.addDoc(firestore_u.collection(Database_u, 'users', req.params["username"], 'mealplans'), recipe).then(function () {
                res.status(200).send("Recipe saved to the mealplan of ".concat(req.params["username"]));
            });
        }
        else {
            res.status(400).send("One or more required inputs is not defined");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send('Error: Meal Plan entry could not be saved');
    }
});
module.exports = router;
