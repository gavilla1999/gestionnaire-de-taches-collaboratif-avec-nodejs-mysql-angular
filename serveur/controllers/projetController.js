const Projects = require('../modeles/projet.js')


const createProject = async (req, res) =>{
    try{
        const {name, description, type} = req.body
        const user = req.user
        console.log(name)
        if(name && description && type){
        const result = await Projects.create(name, description, type, user)
            if (result.succes){
                res.json({status: "Succes !", message : result.message})
            }
            else{
                res.json({status: "Echec !", message : result.message})
            }
        }
        else{
            res.json({status:'Echec !', message:'Toutes les informations sont oligatoires.'})
        }
    }
    catch(err){
        res.json({status:'Echec !', message: 'Une érreur est survenue lors de la création de ce projet'})
        console.log(err)

    }
}
const updateProject = async (req, res) =>{

    try{
        const  idProjet = req.params.Id
        const {name, description, type} = req.body
        const courent =  req.user
       
        console.log(idProjet)
        if( name && description && type ){
            const result =  await Projects.update(idProjet, name, description, type, courent)
            console.log(result)
            if (result.succes){
                res.json({status: "Succes !", message : result.message})
            }
            else{
                res.json({status: "Echec !", message : result.message})
            } 
        }
        else{
            res.json({status: "Echec !", mesage: "Toutes les informations sont oligatoires."})
        }

    }
    catch(err){
        res.json({status:'Echec !', message: 'Une érreur est survenue lors de la modification de ce projet'})
        console.log(err)

    }


}

// implémentation de la lecture de tous les projets


const getAllProjects = async (req, res) =>{
    try{
        const courentUser = req.user
       const result = await Projects.getAll(courentUser)
       if (result.succes){
        res.json({status: "Succes !", message : result.message})
        }
        else{
            res.json({status: "Echec !", message : result.message})
        } 

    }
    catch(err){
        res.json({status:"Echec!", message:"Une érreur est survenue"})
        console.log(err)
    }
}
// implémentation de la lecture de tous les projets

const  deleteProject = async (req, res)=>{
    try {
        const projectId = req.params
        const projectAuthor = req.user
        const result =  await Projects.delete(projectId, projectAuthor)
        if (result.succes){
            res.json({status: "Succes !", message : result.message})
            }
            else{
                res.json({status: "Echec !", message : result.message})
            }     
    }
    catch(err){
        res.json({status:"Echec!", message:"Une érreur est survenue lors de la suppression de ce projet."})
        console.log(err)
    }
}

// implémentation de la lecture de certains projets

const  researchProject = async (req, res) =>{
    try{
        const name = req.body
        const user = req.user
        console.log(name)
        if(!name){
            res.json({status:"Echec !", message:" Une information est nécessaire pour orienter la recherche "})
        }
        else{
            const result = await Projects.research(name,user)
            if (result.succes){
                res.json({status: "Succes !", message : result.message})
                }
                else{
                    res.json({status: "Echec !", message : result.message})
                } 
        }
    }
    catch(err){
        res.json({status:"Echec!", message:"Une érreur est survenue lors de la recherche."})
        console.log(err)
    }
}



module.exports =[createProject, updateProject, getAllProjects, deleteProject, researchProject]