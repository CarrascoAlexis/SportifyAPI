const express = require('express')
const bodyParser = require("body-parser");

// Importation de tous les routers
const eventRouter = require('./routes/event')



// Creation de l'app express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Utilisation des routes dans l'app
app.use("/events", eventRouter)

// URL de tests
app.get('/', async function(req, res){
    res.send("Hello world");
});
app.get('/status', async function(req, res){
    res.send("Bah tout marche dcp nan ?");
});




app.listen(process.env.PORT || 5000,function(req,res){
    console.log("Server Started!");
});