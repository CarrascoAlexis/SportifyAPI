const express = require('express');

const router = express.Router()

const config = require('../config/connect')

const { generateQuery, isEmpty, emptyParam, testPassword } = require('../functions')

router.get("/", (req, res) => {
    // Si aucun filtre n'est indiqué dans la requette ou que celui-ci est vide ({}) l'API envoie la liste complète des events
    if(req.body.filter == undefined || req.body.filter == null || isEmpty(req.body.filter))
    {
        config.query('SELECT `id`, `nickname`, `isEmploye`, `mail` FROM user', (err, results) => {
            if(err) res.json({"error": err})
            else res.json(results)
        })
        return;
    }
    // Sinon, on récupère la liste des colones de la table event depuis la base de données (permet de modifier la BDD sans toucher a l'API))
    // Cette requette est faite ici et non dans la fonction generateQuery pour des questions de synchronisation mais également de simplicité
    config.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'user';", (err, results) => {
        if(err)
        {
            res.json({"error": err})
            return;
        }
        // Puis on génère une requette SQL avec les paramètres récupérés au dessus  (se )
        config.query(generateQuery("user", results, req.body.filter, "`id`, `nickname`, `isEmploye`, `mail`"), (err, results) => {
            if(err) res.json({"error": err})
            res.json(results)
        })
    })
});


router.get("/connect", (req, res) => {
    if(req.body.params == undefined || req.body.params == null || isEmpty(req.body.params) || req.body.params.nickname == undefined || req.body.params.nickname == null || req.body.params.password == undefined || req.body.params.password == null)
    {
        res.json({"error": "must give a nickname and a password"})
        return;
    }
    const pass = req.body.params.password
    config.query('SELECT id, pass FROM user WHERE `nickname`=?', [req.body.params.nickname], (err, results) => {
        if (err) res.json({err})
        if(results[0] != undefined && testPassword(pass, results[0].pass))
        {
            // On va ici générer une session
            return
        }
        // Le mot de passe ne correspond pas
        res.json({"error": "Incorrect password or username"})
        console.log("c pas pareil")
    })
})

module.exports = router;