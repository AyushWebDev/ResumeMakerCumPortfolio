const express=require("express");
const Job=require("../model/job");
const router=express.Router();
const mongoose=require("mongoose");
const { response } = require("express");

router.post("/postJob",async (req,res)=>{
    try{
        const job=new Job(req.body);
        const jobInfo= await job.save();
        res.status(201).json(jobInfo);
    }
    catch(err)
    {
        res.status(400).json({error: e});
        console.log(e);
    }
})

router.get("/getOrgJob/:id", async (req,res)=>{
    try{
        const orgId=new mongoose.Types.ObjectId(req.params.id);
        
        const job=await Job.find({org: orgId}).populate({path: 'org'});
        if(!job){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
           res.status(200).json(job);
        }

    }
    catch(err)
    {
        res.status(400).json({error: err});
        console.log(err);
    }
})
router.get("/getAllJob", async (req,res)=>{
    try{
        const job=await Job.find().populate({path: 'org'});
        if(!job){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
           res.status(200).json(job);
        }

    }
    catch(err)
    {
        res.status(400).json({error: err});
        console.log(err);
    }
})

router.get("/getAllJob", async (req,res)=>{
    try{
        
        
        const job=await Job.find().populate({path: 'applicants'});
        if(!job){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
           res.status(200).json(job);
        }

    }
    catch(err)
    {
        res.status(400).json({error: err});
        console.log(err);
    }
})

router.get("/getOrgJobWithApplicants/:id", async (req,res)=>{
    try{
        const orgId=new mongoose.Types.ObjectId(req.params.id);
        
        const job=await Job.find({org: orgId}).populate({path: 'applicants'});
        if(!job){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
           res.status(200).json(job);
        }

    }
    catch(err)
    {
        res.status(400).json({error: err});
        console.log(err);
    }
})

router.delete("/deleteOrgJob/:id",(req,res)=>{
    const Id=req.params.id;
   Job.deleteOne({_id: Id})
   .then(()=>{
       res.status(200).json({msg: "Job Deleted"});
       console.log("Job deleted");
   })
   .catch(err=>{
       res.status(400).json({error: err});
       console.log(err);
   })
})

router.put("/addApplicant/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=await Job.findByIdAndUpdate({_id: id},
         {$push:{applicants: req.body.id}},{new: true})
         if(!updatedData){
            return res.status(400).json({error: "Data not found"})
        }
         res.json(updatedData);
    }catch(e){
        res.json({error: e});
        console.log(e);
    }
})

router.put("/removeApplicant/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=await Job.findByIdAndUpdate({_id: id},
         {$pull:{applicants: req.body.id}},{new: true})
         if(!updatedData){
            return res.status(400).json({error: "Data not found"})
        }
         res.json(updatedData);
    }catch(e){
        res.json({error: e});
        console.log(e);
    }
})

module.exports=router;