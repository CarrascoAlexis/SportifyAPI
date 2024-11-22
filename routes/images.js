const express = require('express');
const router = express.Router()
var fs = require('fs');

const config = require('../config/connect')
const {uploadUser, uploadEvent} = require('../config/multer')
const { generateQuery, isEmpty, emptyParam } = require('../functions')

router.get("/event", (req, res) => {
    if(req.query.filter.eventId == undefined || req.query.filter.eventId == null)
    {
        res.json({"error": "Must give an event ID"})
        return;
    }
    config.query("SELECT * FROM eventpicture WHERE eventId=?", [req.query.filter.eventId], (err, results) => {
        if(err) return res.json({"error": err})
        res.json(results)
    })
});

router.post('/eventupload', uploadEvent.array('eventPic'), (req, res) => {
    if(req.body.eventId == null || req.body.eventId == undefined)
    {
        return res.json({"error": "must give a event id"})
    }
    for(let i = 0; i < req.files.length; i++)
    {
        config.query("INSERT INTO eventpicture VALUES (NULL, ?, ?)", [req.body.eventId, req.files[i].filename])
    }
    res.json({ message: 'Files uploaded successfully'});
});

router.delete('/eventdelete', (req, res) => {
    if(req.body.images == null || req.body.images == undefined)
    {
        return res.json({"error": "must give images data"})
    }
    for(let i = 0; i < req.body.images.length; i++)
    {
        console.log(req.body.images[i])
    }
})

router.post('/profileupload', uploadUser.single('profilePic'), (req, res) => {
    if(!req.body.userId || !req.file)
    {
        return res.json({"error": "must give a user id and a file"})
    }
    config.query("SELECT profile FROM user WHERE id=?", [req.body.userId], (err, profile) => {
        if(err) return res.json({"error": err})
        config.query("UPDATE user SET profile=? WHERE id=?", [req.file.filename, req.body.userId], (err, results) => {
            if(err) return res.json({"error": err})
            if (fs.existsSync(`profiles/${profile[0]}`)) fs.unlinkSync(`profiles/${profile[0]}`, (err) => {
                if(err) return console.log(err);
                console.log('file deleted successfully');
            });
            res.json({ message: 'File uploaded successfully', filename: req.file.filename });
        })
    })
    
});

module.exports = router;