const express=require('express');
const app=express();
app.use(express.json());
require("dotenv").config();
const cors=require('cors');
app.use(cors());
const connect=require('./auth/db')
const {register,login}=require('./auth/auth')

const user=require('./controller/userController')

app.use('/user',user)
app.use('/user/register',register)
app.use('/user/login',login)

app.listen(3002,()=>{
    connect()
    console.log("connected to db successfully");
})