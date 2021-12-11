const express=require('express');
const Employer=require("../model/employer");
const router=express.Router();
const dotenv = require("dotenv"); 
const jwt=require("jsonwebtoken");
const auth=require("../controller/auth");
//const expressJwt=require("express-jwt");
 
dotenv.config();


router.post("/",async (req,res)=>{
    try{
        const empExist=await Employer.findOne({email: req.body.email})
        if(empExist)
            return res.status(400).json({
                error: "email already taken"
            });
        const emp=new Employer(req.body);
        const empInfo=await emp.save();
        res.status(201).json(empInfo);
    }catch(e){
        res.status(400).json({error: e});
        console.log(e);
    }
})

router.post("/signin",async (req,res)=>{
    try{
    const {email,password}=req.body;
    const e=await Employer.findOne({email});
        if(!e)
        {
            return res.status(401).json({
                error: "user with that email doesn't exist.Please try again"
            }); 
        }
        //if found, authenticate
        //create authenticate method in user model and use
        if(!e.authenticate(password))
        {
            return res.status(401).json({
                error: "email and password doesn't match"
            });
        }
        //generate a token with user id and secret
        const token=jwt.sign({_id: e._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire: new Date()+300000});
        //return response with user and token to frontend client
        
        return res.status(201).json({token,emp: e,msg: "Signed In Successfully"});
    }catch(err){
        console.log(err);
    }
})

router.get("/signout",(req,res)=>{
    res.clearCookie("t");
    return res.json({
        msg: "signout success"
    });
})

router.get("/getBasics/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const empInfo=await Employer.findById({_id: id})
        if(!empInfo){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
            res.status(200).json(empInfo);
        }
    }catch(e){
        res.json({error: e})
        console.log(e);
    }
})

module.exports=router;