const express = require('express');
const mysql = require('mysql2');

const router = express.Router()

const config = require('../config/connect')

const { generateQuery, isEmpty } = require('../functions')

router.get("/", (req, res) => {
    // Si aucun filtre n'est indiqué dans la requette ou que celui-ci est vide ({}) l'API envoie la liste complète des events
    if(req.body.filter == undefined || req.body.filter == null || isEmpty(req.body.filter))
    {
        config.query('SELECT * FROM event', (err, results) => {
            if(err) res.json({"error": err})
            else res.json(results)
        })
        return;
    }
    // Sinon, on récupère la liste des colones de la table event (depuis la base de données, permetant de modifier la BDD sans modifier l'API)
    config.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'event';", (err, results) => {
        if(err)
        {
            res.json({"error": err})
            return;
        }
        // Puis on génère une requette SQL avec les paramètres récupérés au dessus  (se )
        config.query(generateQuery("event", results, req.body.filter), (err, results) => {
            if(err) res.json({"error": err})
            res.json(results)
        })
    })
});

module.exports = router;