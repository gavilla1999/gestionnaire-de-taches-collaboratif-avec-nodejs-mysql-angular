const dbconnexion = require('../config/database.js')
const jwt = require('jsonwebtoken')
const connexion = require('../config/database.js')
const { reject, promise } = require('bcrypt/promises')

class Projects {
    constructor(){}

    // implémentation de la création d'un projet 
    // pour créer un projet l'utilisateur doit être connecté à la plateforme

    static create = async ( projectName, projectDescription, projectType, user) => {
        try {
// si le résultat renvoyé n'est pas vide alors on compare les mails et les noms d'utilisateur afin d'envoyer des messages spécifiques en fonction des cas
         await dbconnexion.query("insert into projects(NAME, DESCRIPTION, TYPE, AUTHOR_ID) VALUES(?,?,?,?)",[projectName, projectDescription,projectType, user.ID],(err,resultats) =>{
                if(err){
                    console.log(err)
                   }
                
                else{
                    console.log(resultats)
                } 
            }) 
            return {succes: true, message: "Projet créé avec succes"}

    }
          catch (error) {
            console.log(error)
            throw err
        }
    }

     // implémentation de la modification d'un projet
     // au préalable la ,dification d'un projet  ne se fait que  par le propriétaire de la tâche mais nous verrons des exception à cela

    static update = async (projectId ,newName ,newdescrition ,newType ,user )=>{
        try{
            const existsProject = await new Promise((resolve, reject)=>{
                dbconnexion.query("select NAME, DESCRIPTION, TYPE, DATE, AUTHOR_ID  FROM PROJECTS WHERE ID = ?", [projectId], (err, results)=>{
                    if(err){
                        reject(err)
                        console.log(err)
                    }
                    else{
                        resolve(results)
                    }
                })
            })
            if(existsProject.length > 0 ){
                console.log(existsProject[0])
                const project = existsProject[0]
                if(project.AUTHOR_ID === user.ID){
                    await dbconnexion.query("update projects set  NAME =? , DESCRIPTION =?, TYPE = ? where ID = ?",[newName, newdescrition, newType, projectId] , (err)=>{
                        if(err){
                            console.log(err)
                        }
                        /*else{
                           return {sucess : true, message: "Projet modifié avec succes"}
                        }*/
                    })
                    return {succes : true, message: "Projet modifié avec succes"}

                }
                else{
                    return {succes: false, message:" Vous ne pouvez pas modifier cette tâche."}
                }
            }
            else{
                return {succes: false, message:" Projet inexistant."}
            }

        }
        catch(err){
           console.log(err)
           throw err
        }
    }

// Implémentation de la lecture des projets que l'on ordonnera par ordre alphabétique de nom
    static getAll = async  ( user) =>{
        try{
            const allProjects = await new Promise((resolve, reject)=>{
                dbconnexion.query("select NAME, DESCRIPTION, TYPE, DATE, AUTHOR_ID FROM PROJECTS ORDER BY NAME ASC", (err,results)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(results)
                    }
                })
            })
            if(allProjects.length > 0){
                 let projects = []
                 console.table(allProjects)
                 console.table(user)
                for(let row of allProjects){
                    console.table(row)
                    if(user.ID === row.AUTHOR_ID){
                        projects.push(row)
                    }
                    else{
                        if(row.TYPE == "public"){
                            projects.push(row)
                        }
                   /* else{
                            return false
                        }*/
                    }
                }
                return {succes:false, message: projects}
            }
            else{
                return {succes: true, message:" Aucun projet n'a été trouvé.."}
                } 

        }
        catch(err){
            console.log(err)
            throw err
        }
    }
      

// implémentation de la suppréssion d'un projet
// au préalable seul le propriétaire de la tâche peut la supprimer

    static delete = async (projectId, projectAuthor)=>{
        try{
            console.log(projectId.projectId)
            console.log(projectAuthor)
            const existsProject = await new Promise ((resolve, reject)=>{
                dbconnexion.query("select NAME, DESCRIPTION, TYPE, DATE, AUTHOR_ID  FROM PROJECTS WHERE ID = ?", [projectId.projectId], (err, results)=>{
                    if(err){
                        reject(err)
                        console.log(err)
                    }
                    else{
                        resolve(results)
                    }
                })
            })
            console.log(existsProject)
            if(existsProject.length > 0){
                if( existsProject[0].AUTHOR_ID === projectAuthor.ID){
                    await dbconnexion.query("delete from projects where ID = ?", [projectId.projectId], (err, results)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log(results)
                        }

                    })
                    return {succes: true, message: "Projet supprimé avec succes"}
                }
                else{
                    return {succes: false, message: "Vous  ne pouvez pas supprimer cette tâche ."}
                }
            }
            else{
                return {succes: false, message: "Ce projet n'existe pas"}
            }

        }
        catch(err){
            console.log(err)
            throw err
        }
    }

// implémentation de la recherche d'un projet
    static research = async (projectName, projectAuthor)=>{
        try{
            console.log(projectName.name)
            console.log(projectAuthor)

            const projectExist = await new Promise((resolve, reject)=>{
                dbconnexion.query("SELECT NAME, DESCRIPTION, TYPE, DATE, AUTHOR_ID FROM PROJECTS WHERE NAME = ?", [projectName.name],(err, results)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(results)
                    }
                })
            })
            if(projectExist.length > 0 ){
                console.table(projectExist)
                let projects = []
                for( let project of projectExist) {
                    if (project.AUTHOR_ID === projectAuthor.ID){
                        projects.push(project)
                    }
                    else{
                        if(project.TYPE === "public"){
                            projects.push(project)
                        }
                       /* else{
                            return false
                        }*/
                    }
                }
                return {succes : true, message: projects}
            }
            else{
                return {succes : false, message: "Aucun projet trouvé" }
            }
        }
        catch(err){
            console.log(err)
            throw err
        }
    }


}
module.exports = Projects
