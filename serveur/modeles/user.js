
// user.js
const dbconnexion = require('../config/database.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Users {
    constructor(){}

    static create = async (lastName, firstName, email, userName, password) => {
        try {

     // vérifier si l'utilisateur existe déjà
     
     //  ici on va retourner une promesse 

     const userExists = await new Promise((resolve, reject) => {
        dbconnexion.query("SELECT ID, EMAIL, USERNAME FROM USERS WHERE USERNAME = ? OR EMAIL = ?", [userName, email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
// si le résultat renvoyé n'est pas vide alors on compare les mails et les noms d'utilisateur afin d'envoyer des messages spécifiques en fonction des cas

    if (userExists.length > 0) {
        const existingUser = userExists[0];
        // si seul le nom d'utilisateur correspond 

        if (existingUser.USERNAME === userName && existingUser.EMAIL !== email ) {
            return {succes: false, message:"Un utilisateur avec ce nom d'utilisateur existe déjà! 😔😔😔 "}
        // si seul l'adresse mail correspond 

        } else if (existingUser.EMAIL === email && existingUser.USERNAME !== userName) {

            return {succes: false, message:"Un utilisateur avec cette adresse e-mail existe déjà! 😔😔😔"}
        }
        // si les deux correspondent
        else{
            return {succes: false, message:"Un utilisateur avec cette adresse e-mail et ce nom d'utilisateur existe déjà! 😔😔😔 "}
        }
    }
    // si le resultat est vide  : on insert un nouvel utilisateur
     else {
        const salt = await bcrypt.genSalt(13)
        const hashpassword = await bcrypt.hash(password, salt)
        dbconnexion.query("INSERT INTO Users(LASTNAME, FIRSTNAME, EMAIL, PASSWORD, USERNAME) VALUES (?, ?, ?, ?, ?)", [lastName, firstName, email, hashpassword, userName], (err) => {
            if (err) {
                console.log(err);
            } else {
                return { succes: true, message: "Utilisateur créé avec succès ! 🎉✨✨ " }
            }
            })
        }
    }       
    catch (err) {
            console.log(err);
            throw err
        }
    }


    static login = async(email = '', userName = "" , password) =>{

        try{
            const userExists = await new Promise (( resolve, reject) =>{
                dbconnexion.query("SELECT * FROM Users WHERE EMAIL = ? OR USERNAME = ? ", [email, userName],(err, resultats)=>{
                    if (err){
                        reject(err)
                    }
                    else{
                        resolve(resultats)
                    }
                });
        })
        if (userExists.length >0){
            const user = userExists[0]
            const isMatch = await bcrypt.compare( password, user.PASSWORD)
            if (isMatch){
                const token = await jwt.sign({userId:user.ID}, process.env.KEY,{expiresIn:'30d'})
                return {succes: true, message:"Utilisateur connecté avec succès",user: user, token:token }
            }
            else{
                return {succes:false, message:'identifaint ou mot de passe incorrect ! ' }
            }
        }
        else{
           return {succes:false, message:"Un tel utilisateur n'existe pas " }
        }
}
        catch(err){
            console.log(err)
            throw err
        }
}


}

module.exports = Users