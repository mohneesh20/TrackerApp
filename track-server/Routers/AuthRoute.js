const express=require("express");
const Router=express.Router();
const {SignUp,SignIn} =require('../controller/Signup');
Router.post("/signUp",SignUp);
Router.post("/signIn",SignIn);
module.exports=Router;