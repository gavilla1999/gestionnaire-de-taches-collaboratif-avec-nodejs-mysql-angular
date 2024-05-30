
const Users = require('../modeles/user.js');

const createUser = async (req, res) => {
    try {
        const { lastName, firstName, email, userName, password, passwordConfirmation } = req.body;

        if (firstName && email && userName && password && passwordConfirmation) {
            if (password !== passwordConfirmation) {
                res.json({ status: "Echec", message: "Les mots de passe ne correspondent pas! 😒😒😒 " });
            } else {
               const result = await Users.create(lastName, firstName, email, userName, password);
               if (result.succes){
                   res.json({status: "Succes !", message : result.message})
               }
               else{
                    res.json({status: "Echec !", message : result.message})
               }
            }
        } else {
            res.json({ status: "Echec", message: "Veuillez fournir les informations requises ! 😒😒😒" });
        }
    } catch (error) {
        res.json({ status: 'Echec', message: "Une erreur est survenue lors de la création de ce compte! 😔😔😔" })
        console.log(err)

    }
};

const login =async (req, res)=>{
    try{
            const { userName, email, password } = req.body
            if (!userName && !email && !password){
                res.json({status:'Echec!', message:"Un identifiant et le mot de passe sont requis pour vous connecter à la plateforme"})
            }
            else if (!password){
                res.json({status:'Echec!', message:"Un identifiant et le mot de passe sont requis pour vous connecter à la plateforme"})   
            }
            else if (!email && ! userName){
                res.json({status:'Echec!', message:"Un identifiant et le mot de passe sont requis pour vous connecter à la plateforme"})   
                  
            }
            else {
                const result = await Users.login(email, userName, password)
                console.log(result)
                if (result.succes){
            console.log(result.succes)

                    res.json({status: "Succes !", message : result.message, user: result.user, token : result.token})
                }
                else{
            console.log(result.succes)

                     res.json({status: "Echec !", message : result.message})
                }
            }
            
    }
    catch(err){
        res.json({ status: 'Echec', message: "Une erreur est survenue lors de la connexion à votre compte! 😔😔😔" });  
        console.log(err)
    }
}

module.exports = [createUser, login];
