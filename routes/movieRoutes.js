const express=require('express')
const router =express.Router()
const movies =require('../movies')

const myLogger=function(req,res,next){
  console.log('LOGGED')
  console.log(req.body)
  next()
}
//movies

router.get('/',myLogger,(req,res)=>{
  try{
    res.status(200).json(movies)
  }catch(error){
    res.status(404).json({error:error.message})
  }
})

//get movies by id
router.get('/:id',(req,res)=>{
//  res.send("Get all the movies")

try{

  const movieID=parseInt(req.params.id)
  const movie =movies.find(mov=>
      mov.id===movieID
  )
  if(!movie)
      res.status(404).json
  ({error:"movie not found"})
         res.status(200).json(movie)
}catch(error){
  res.status(404).json({error:error.message})
}
})

//POST - create movie
router.post('/',myLogger,(req,res)=>{
  try{
    if(!req.body)
      return  res.status(404).json({message:"Title,Genre,ReleaseYear and Rating are required"})
    const {title,genre,releaseyear,rating}=req.body
    const newmovie={
      id:movies.length?movies[movies.length-1].id+1:1,
     title:title,
     genre:genre,
     releaseyear:releaseyear,
     rating:rating
    }
    movies.push(newmovie)
    res.status(201).json({message:"movie added",movie:newmovie})
  }catch(error){
    res.status(404).json({error:error.message})
  }
})
//update
router.patch('/:id',(req,res)=>{
  //  res.send("Get all the movies")
  
  try{
  
    const movieID=parseInt(req.params.id)
    const movie =movies.find(mov=>
        mov.id===movieID
    )
    if(!movie)
        res.status(404).json
    ({error:"movie not found"})
           const {title,genre,releaseyear,rating} =req.body
           if(title)movie.title=title
           if(genre)movie.genre=genre
           if(releaseyear)movie.releaseyear=releaseyear
           if(rating)movie.rating=rating
           res.status(200).json(movie)
  }catch(error){
    res.status(404).json({error:error.message})
  }
  })

  //delete

  router.delete('/:id',(req,res)=>{
    //  res.send("Get all the movies")
    
    try{
    
      const movieID=parseInt(req.params.id)
      const movieIndex =movies.findIndex(mov=>
          mov.id===movieID
      )
      if(movieIndex== -1)
        return  res.status(404).json
      ({error:"movie not found"})
    const deletedmovie=  movies.splice(movieIndex,1)
             res.status(200).json({message:"movie deleted",movie:deletedmovie})
    }catch(error){
      res.status(404).json({error:error.message})
    }
    })
module.exports=router