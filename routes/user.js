const express = require('express');
const { randomBytes } = require('node:crypto');

const router = express.Router()

const config = require('../config/connect')

const { generatequery, isEmpty, emptyParam, testPassword } = require('../functions')

router.get("/", (req, res) => {
    // Si aucun filtre n'est indiqué dans la requette ou que celui-ci est vide ({}) l'API envoie la liste complète des events
    if(req.query.filter == undefined || req.query.filter == null || isEmpty(req.query.filter))
    {
        config.query('SELECT `id`, `nickname`, `isEmploye`, `mail` FROM user', (err, results) => {
            if(err) res.json({"error": err})
            else res.json(results)
        })
        return;
    }
    // Sinon, on récupère la liste des colones de la table event depuis la base de données (permet de modifier la BDD sans toucher a l'API))
    // Cette requette est faite ici et non dans la fonction generatequery pour des questions de synchronisation mais également de simplicité
    config.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'user';", (err, results) => {
        if(err)
        {
            res.json({"error": err})
            return;
        }
        // Puis on génère une requette SQL avec les paramètres récupérés au dessus  (se )
        config.query(generatequery("user", results, req.query.filter, "`id`, `nickname`, `isEmploye`, `mail`"), (err, results) => {
            if(err) res.json({"error": err})
            res.json(results)
        })
    })
});


router.get("/connect", (req, res) => {
    console.log(req.query)
    if(req.query.nickname == undefined || req.query.nickname == null || req.query.password == undefined || req.query.password == null)
    {
        res.json({"error": "must give a nickname and a password"})
        return;
    }
    const givenPass = req.query.password
    console.log(givenPass)
    config.query('SELECT id, pass, isEMploye, mail FROM user WHERE `nickname`=?', [req.query.nickname], (err, results) => {
        if (err) res.json({err})
        if(results.length != 0)
        {
            console.log(results[0].pass)
            const cryptedPass = results[0].pass
            config.query('SELECT PASSWORD(?) as pass', [givenPass], (err, response) => {
                if (err) res.json({err})
                givenCryptedPass = response[0].pass
                if(givenCryptedPass == cryptedPass)
                {
                    require('crypto').randomBytes(48, function(err, buffer) {
                        var token = buffer.toString('hex');
                        res.json({"token": token, "user": {"nickname": req.query.nickname}})
                      });
                    
                    return;
                }
                else res.json({"error": "Incorrect password or username"})
            })
        }
        else res.json({"error": "Incorrect password or username"})
    })
})

module.exports = router;