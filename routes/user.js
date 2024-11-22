const express = require('express');
const { randomBytes } = require('node:crypto');

const router = express.Router()

const config = require('../config/connect')

const { generatequery, isEmpty, emptyParam, testPassword } = require('../functions')

router.get("/", (req, res) => {
    // Si aucun filtre n'est indiqué dans la requette ou que celui-ci est vide ({}) l'API envoie la liste complète des events
    if(req.query.filter == undefined || req.query.filter == null || isEmpty(req.query.filter))
    {
        config.query('SELECT `id`, `nickname`, `isEmploye`, `mail`, `profile` FROM user', (err, results) => {
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
        config.query(generatequery("user", results, req.query.filter, "`id`, `nickname`, `isEmploye`, `mail`, `profile`"), (err, results) => {
            if(err) res.json({"error": err})
            res.json(results)
        })
    })
});


router.get("/connect", (req, res) => {
    if(req.query.nickname == undefined || req.query.nickname == null || req.query.password == undefined || req.query.password == null)
    {
        return res.json({"error": "must give a nickname and a password"})
    }
    const givenPass = req.query.password
    config.query('SELECT id, pass, isEmploye, mail, profile FROM user WHERE `nickname`=?', [req.query.nickname], (err, results) => {
        if (err) return res.json({"error": err})
        if(results.length != 0)
        {
            const cryptedPass = results[0].pass
            config.query('SELECT SELECT CONCAT('*', UPPER(SHA1(UNHEX(SHA1(?))))) as pass', [givenPass], (err, response) => {
                if (err) res.json({"error": err})
                givenCryptedPass = response[0].pass
                if(givenCryptedPass == cryptedPass)
                {
                    require('crypto').randomBytes(48, function(err, buffer) {
                        const token = buffer.toString('hex');
                        config.query('INSERT INTO session VALUES (NULL, ?, ?)', [results[0].id, token], (err, sessionResults) => {
                            if(err) return res.json({"error": err})
                            else return res.json({"token": token, "user": {"nickname": req.query.nickname, "isEmploye": results[0].isEmploye, "mail": results[0].mail, "id": results[0].id, "profile": results[0].profile}})
                        })
                      });
                    
                    return;
                }
                else return res.json({"error": "Incorrect password or username"})
            })
        }
        else return res.json({"error": "Incorrect password or username"})
    })
})

router.get("/getSession", (req, res) => {
    if(req.query.token == undefined || req.query.token == null)
    {
        return res.json({"error": "must give a session token"})
    }
    config.query("SELECT userId FROM session WHERE token = ?", [req.query.token], (err, results) => {
        if(err) res.json({"error": err})
        else
        {
            if(results.length == 0)
            {
                return res.json({"error": "no session found"})
            }
            config.query("SELECT nickname, isEmploye, mail, id, profile FROM user WHERE id = ?", [results[0].userId], (err, user) => {
                if(err) res.json({"error": err})
                if(user[0] == null) res.json({"error": "Undefined user"})
                else
                {
                    const userData = user[0]
                    return res.json(userData)
                }   
            })
        }
    })
})

router.post("/destroySession", (req, res) => {
    if(req.body.token == undefined || req.body.token == null)
    {
        return res.json({"error": "must give a session token"})
    }
    config.query("DELETE FROM session WHERE token = ?", [req.body.token], (err, results) => {
        if(err) return res.json({"error": err})
        else return res.json(results)
    })
})

router.post("/create", (req, res) => {
    if(req.body == null | req.body == undefined)
    {
        return res.json({"error": "Must give user data"})
    }
    const user = req.body
    config.query("INSERT INTO user VALUES (NULL, ?, ?, ?, SELECT CONCAT('*', UPPER(SHA1(UNHEX(SHA1(?))))), ?)", [user.nickname, user.isEmploye, user.mail, user.password, user.profile], (err, results) => {
        if(err) res.json({"error": err})
        else{
            res.json(results) 
        }

        return
    })
})

router.post("/edit", (req, res) => {
    if(req.body == null | req.body == undefined)
    {
        res.json({"error": "Must give user data"})
        return
    }
    const user = req.body
    config.query("UPDATE user SET nickname=?, isEmploye=?, mail=?, profile=? WHERE ID = ?", [user.nickname, user.isEmploye, user.mail, user.profile, user.id], (err, results) => {
        if(err) res.json({"error": err})
        else res.json(results)
        return
    })
})

router.delete("/delete", (req, res) => {
    if(req.query.userId == null | req.query.userId == undefined)
    {
        res.json({"error": "Must give user id"})
        return
    }
    config.query("DELETE FROM user WHERE id=?", [req.query.userId], (err, results) => {
        if(err) return res.json({"error": err})
        else return res.json(results)
    })
})

module.exports = router;