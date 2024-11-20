const express = require('express')
const bodyParser = require("body-parser");
var cors = require('cors');
const upload = require('./config/multer')

// Importation de tous les routers
const eventRouter = require('./routes/event')
const userRouter = require('./routes/user')
const imagesRouter = require('./routes/images')


// Creation de l'app express
var app = express();app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(upload.single())

// Utilisation des routes dans l'app
app.use("/events", eventRouter)
app.use("/user", userRouter)
app.use("/image", imagesRouter)

// URL de tests
app.get('/', async function(req, res){
    res.send("Hello world");
});
app.get('/status', async function(req, res){
    res.send("Bah tout marche dcp nan ?");
});

app.use('/eventsPic', express.static('eventsPic'))
app.use('/profiles', express.static('profiles'))

app.listen(process.env.PORT || 5000,function(req,res){
    console.log("Server Started!");
});