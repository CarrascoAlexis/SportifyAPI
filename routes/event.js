const express = require('express');

const router = express.Router()

const config = require('../config/connect')

const { generateQuery, isEmpty, emptyParam } = require('../functions')

router.get("/", (req, res) => {
    // Si aucun filtre n'est indiqué dans la requette ou que celui-ci est vide ({}) l'API envoie la liste complète des events
    if(req.query.filter == undefined || req.query.filter == null || isEmpty(req.query.filter))
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
        config.query(generateQuery("event", results, req.query.filter), (err, results) => {
            if(err) res.json({"error": err})
            res.json(results)
        })
    })
});

router.get("/users", (req, res) => {
    console.log(req.query)
    if(req.query.filter.eventId == undefined || req.query.filter.eventId == null)
    {
        res.json({"error": "Must give an event ID"})
        return;
    }
    if(req.query.filter.userId == undefined || req.query.filter.userId == null)
    {
        config.query("SELECT * FROM `participation` WHERE `eventId` = ?", [req.query.filter.eventId], (err, results) => {
            if(err) res.json({"error": err})
            return res.json(results)
        })
    }
    else
    {
        config.query("SELECT * FROM `participation` WHERE `eventId` = ? AND accountId = ?", [req.query.filter.eventId, req.query.filter.userId], (err, results) => {
            if(err) res.json({"error": err})
            return res.json(results)
        })
    }
   
})

router.post("/create", (req, res) => {
    if(req.body.params == undefined || req.body.params == null)
    {
        res.json({"error": "Empty body"})
        return;
    }
    let {title, description, players, startDate, endDate, authorId} = req.body.params
    if(emptyParam(players)) players = 0
    console.log([title, players, startDate, endDate, authorId])
    config.query("INSERT INTO event VALUES (NULL, ?, ?, 0, CURRENT_TIMESTAMP(), ?, ?, ?)", [title, description, startDate, endDate, authorId], (err, results) => {
        if(err) res.json({"error": err})
        else res.json(results)
        return;
    })
})

router.post("/participation", (req, res) => {
    console.log(req.body)
    if(req.body.params.eventId == undefined || req.body.params.eventId == null || req.body.params.userId == undefined || req.body.params.userId == null)
    {
        res.json({"error": "Must give an event and a user ID"})
        return;
    }
    config.query("INSERT INTO participation VALUES (NULL, ?, ?, 0)", [req.body.params.userId, req.body.params.eventId], (err, results) => {
        if(err) return res.json({"error": err})
        res.json(results)
    })
})

module.exports = router;