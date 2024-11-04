const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sportifyUser',
    password: 'password', // Mot de passe simplifié pour la version locale, celui-ci ne fonctionne pas sur la version en ligne, pas la peine d'essayer ;) 
    database: 'sportify'
});

module.exports = connection;