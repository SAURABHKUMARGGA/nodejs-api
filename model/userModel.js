const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,

    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified('password')) return next();
    const data = this;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(data.password, salt);
    this.password = hashpassword;
    // console.log(data);
    next();
})

const userModel = mongoose.model('user',userSchema);

module.exports = {userModel};