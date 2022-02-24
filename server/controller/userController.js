const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const User=require('../model/userModel')

const checkvalid=async(req,res,next)=>{
    let bearer=req.headers.authorization;
    let token=bearer.split(" ")[1].trim()
    
    let payload=await jwt.verify(token,process.env.SECRET_KEY);
    req.id=payload._id
    next();
}

router.get('/update',checkvalid,async(req,res)=>{
    try{
        let user=await User.findById(req.id);
        res.send(user)
    }catch(e){
        res.send(e.message)
    }
})


module.exports =router;