const Users = require('../modeles/user.js')
const jwt = require('jsonwebtoken')
const dbConnexion = require('../config/database.js')

var checkauth = async (req, res ,next)=>{

    try{
        let token
        const {authorization} = req.headers
        console.log(authorization)

        if(authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1]
            //vérification du token 
            console.log(token)
           
            const {userId} = await jwt.verify(token , process.env.KEY) 
            console.log(userId)

            const user = await new Promise((resolve, reject) =>{
                 dbConnexion.query('select ID, LASTNAME, FIRSTNAME, EMAIL, USERNAME from Users where ID = ?',[userId], (err, results)=>{
                    if(err){
                        console.log(err)
                        reject(err)
                    }
                    else{
                        resolve(results)
                    }
                })
                
            } )
            console.log(user)
            if (user.length > 0){
                req.user = user[0]
                next()

            }
           
        }
    
        else{
            res.send({status:"Echec!", message : "utilisateur non autorisé"})  
        
        }
    }
    catch(err){
        res.send({status:"Echec!", message : "utilisateur non autorisé"})
    } 
   

}
module.exports = checkauth
