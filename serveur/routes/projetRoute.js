const express = require('express')
const router = express.Router()
const [createProject, updateProject, getAllProjects, deleteProject, researchProject] = require('../controllers/projetController.js')
const authorization = require('../middleware/autorisation.js')

// Protection des routes  

router.use('/registerProject', authorization)
router.use('/updateProject', authorization)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
router.use('/getAllProject', authorization)
router.use('/deleteProject', authorization)
router.use('/researchProject', authorization)





// routes protégées de la gestion de projets

router.post('/registerProject', createProject)
router.patch('/updateProject/:Id', updateProject)
router.get('/getAllProject', getAllProjects)
router.delete('/deleteProject/:projectId', deleteProject)
router.get('/researchProject', researchProject)




,

module.exports = router