const express = require('express');

const router = express.Router()

const config = require('../config/connect')

const { generateQuery, isEmpty, emptyParam } = require('../functions')

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
    // Sinon, on récupère la liste des colones de la table event depuis la base de données (permet de modifier la BDD sans toucher a l'API))
    // Cette requette est faite ici et non dans la fonction generateQuery pour des questions de synchronisation mais également de simplicité
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

router.get("/users", (req, res) => {
    console.log(req.body)
    if(req.body.filter.id == undefined || req.body.filter.id == null || isEmpty(req.body.filter.id))
    {
        res.json({"error": "Must give an event ID"})
        return;
    }
    config.query("SELECT * FROM `participation` WHERE `event_id` = ?", [req.body.filter.id], (err, results) => {
        if(err) res.json({"error": err})
        res.json(results)
    })
})

router.post("/create", (req, res) => {
    if(req.body.params == undefined || req.body.params == null || isEmpty(req.body.params))
    {
        res.json({"error": "Empty body"})
        return;
    }
    let {title, players, startDate, endDate, authorId} = req.body.params
    if(emptyParam(players)) players = 0
    console.log([title, players, startDate, endDate, authorId])
    // console.log(emptyParam([title, players, startDate, endDate, authorId]))
    if(emptyParam([title, players, startDate, endDate, authorId]))
    {
        res.json({"error": "empty params given"})
        return;
    }
    config.query("INSERT INTO event VALUES (NULL, ?, ?, 0, CURRENT_TIMESTAMP(), ?, ?, ?)", [title, players, startDate, endDate, authorId], (err, results) => {
        if(err) res.json({"error": err})
        else res.json(results)
        return;
    })
})

module.exports = router;