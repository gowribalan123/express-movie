const express = require('express')
const path=require('path')
const movieRouter=require('./routes/movieRoutes')
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Movie world")
})

app.use('/movies',movieRouter)
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,"/index.html"))
})

app.listen(3000,()=>{
    console.log("Server Started..")
})
