const express = require("express");

const App = express();

require("dotenv").config();


// middleware
App.use(express.json());
App.use(express.urlencoded({extended:true}))

// Connection
const {DbConnection} = require("./Config/Db")



// requiring function from 'Booth Controller'
const {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    deleteBooth
} = require('./Controllers/boothController')

// Booth Routes
App.route("/booth")
    .get(getAllBooths)  // Get all booth
    .post(createBooth);  // Create a new booth

App.route("/booth/:id")
    .get(getBoothById)  // Get booth by ID
    .put(updateBooth)  // Update booth by ID
    .delete(deleteBooth);  // Delete booth by ID



// requiring function from 'Expo Management Controller'
const {
    createExpoEvent,
    getAllExpoEvents,
    getExpoEventById,
    updateExpoEvent,
    deleteExpoEvent
} = require('./Controllers/expoManagementController')


// Expo Management Routes
App.route("/expo")
    .get(getAllExpoEvents)  // Get all category
    .post(createExpoEvent);  // Create a new category

App.route("/expo/:id")
    .get(getExpoEventById)  // Get category by ID
    .put(updateExpoEvent)  // Update category by ID
    .delete(deleteExpoEvent);  // Delete category by ID


// Checking Connection is Happening or not on console.
App.listen(process.env.PORT,function(){
    console.log(`Server is running on the PORT ${process.env.PORT}`)
    DbConnection();
})