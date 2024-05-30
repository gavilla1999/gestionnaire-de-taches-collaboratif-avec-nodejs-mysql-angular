
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connexion = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout:  60 * 1000,
    acquireTimeout:  60 * 1000,
    timeout:  60 * 1000,
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    port: 3306
});

connexion.getConnection((err) => {
    if (err) {
        console.error(`Erreur lors de la connexion à la base de données ${DB_NAME}: ${err.message}`);
    } else {
        console.log(`Connecté à la base de données vec succès !`);
    }
});
connexion.query('create database  if not exists task_manager', (err, results) =>{
    if(err){console.log(err)}
    else{console.log('base de données créée avec succès !')}
} )
const dbConnexion = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout:  60 * 1000,
    acquireTimeout:  60 * 1000,
    timeout:  60 * 1000,
    host: 'localhost',
    user: 'root',
    database:DB_NAME,
    password: DB_PASSWORD,
    port: 3306
});

dbConnexion.getConnection((err) => {
    if (err) {
        console.error(`Erreur lors de la connexion à la base de données ${DB_NAME}: ${err.message}`)
    } else {
        console.log(`Connecté à la base de données vec succès !`)
    }
});
dbConnexion.query('CREATE TABLE IF NOT EXISTS Users ( ID INT AUTO_INCREMENT PRIMARY KEY,LASTNAME VARCHAR(50), FIRSTNAME VARCHAR(50), EMAIL VARCHAR(100),USERNAME VARCHAR(20),PASSWORD VARCHAR(200),PICTURE VARCHAR(500));', (err, results) =>{
    if(err){console.log(err)}
    else{console.log('table Users créée avec succès !')}
})
dbConnexion.query('CREATE TABLE IF NOT EXISTS Projects ( ID INT AUTO_INCREMENT PRIMARY KEY,NAME VARCHAR(50), DESCRIPTION VARCHAR(500), TYPE VARCHAR(15), AUTHOR_ID INT,  DATE DATETIME DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (AUTHOR_ID) REFERENCES USERS (ID) );', (err) =>{
    if(err){console.log(err)}
    else{console.log('table PROJECTS créée avec succès !')}
})


module.exports = dbConnexion;


