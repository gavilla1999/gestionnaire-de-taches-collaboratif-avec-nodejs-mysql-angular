const express = require('express')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const userRoutes = require('./serveur/routes/userRoutes.js')
const projectRoutes = require('./serveur/routes/projetRoute.js')
dotenv.config()
PORT = process.env.PORT
DB_PASSWORD = process.env.DB_PASSWORD
DB_NAME = process.env.DB_NAME



app = express()
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)








app.listen(PORT, ()=>{
    console.log(`server connected on port ${PORT}`)
})