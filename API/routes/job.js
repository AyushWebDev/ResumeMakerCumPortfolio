const express=require("express");
const Job=require("../model/job");
const router=express.Router();
const mongoose=require("mongoose");

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

module.exports=router;