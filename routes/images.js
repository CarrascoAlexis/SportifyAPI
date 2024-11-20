const express = require('express');
const router = express.Router()

const config = require('../config/connect')
const {uploadUser, uploadEvent} = require('../config/multer')
const { generateQuery, isEmpty, emptyParam } = require('../functions')

router.get("/profile", (req, res) => {
    
});
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

router.post('/profileupload', uploadUser.single('profilePic'), (req, res) => {
    if(req.body.userId == null || req.body.userId == undefined)
    {
        return res.json({"error": "must give a user id"})
    }
    let fileName = "default.jpg"
    if (req.file) {
        fileName = req.file.filename
    }
    config.query("INSERT INTO profilepicture VALUES (NULL, ?, ?)", [req.body.userId, fileName])
    res.json({ message: 'File uploaded successfully', filename: fileName });
});

module.exports = router;