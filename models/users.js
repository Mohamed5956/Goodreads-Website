const mongoose =require('mongoose')
const userschema = new mongoose.Schema({
    firstname:{type:String,minlength:4,require:true},
    lastname :{type:String,minlength:4,require:true},
    email:{type:String,unique:true,match:/.+@.+\..+/},
    password :{ type: String },
    image:{ type: String },
    token:{ type: String },
})

const usermodel = mongoose.model('users',userschema)

module.exports = usermodel