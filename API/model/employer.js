const mongoose=require('mongoose');
const crypto=require("crypto");

const employerSchema=new mongoose.Schema({
    firstname: {
        type: String,
        required: [true,"name not provided"]
    },
    lastname: String,
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    email: String,
    orgname: {
        type: String,
        required: [true,"name not provided"]
    },
    address: String
}) 

employerSchema.virtual("password")
.set(function(password){
    //create temp var _password
    this._password=password;//password=the password given by user
   
    //encrypt password
    this.hashed_password=this.encryptPassword(password);//func we will make
})
.get(function() {
    return this._password;
})

//method
employerSchema.methods={
    encryptPassword: function(password){
        if(!password)
            return "";
        try{
            return crypto.createHash("sha1")
                    .update(password)
                    .digest("hex");
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }

    
}

module.exports=mongoose.model("Employer",employerSchema);