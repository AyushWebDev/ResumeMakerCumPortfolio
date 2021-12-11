const mongoose=require("mongoose");

const jobSchema=mongoose.Schema({
    title: String,
    description: String,
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer"
    },
    location: String,
    openings: Number,
    eligibility: {
        exp: Number,
        edu: String,
        description: String
    }
})

module.exports=mongoose.model("Job",jobSchema);