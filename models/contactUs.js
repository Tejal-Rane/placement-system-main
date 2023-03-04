const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema(
    {
        name:String,
        email:{
            type:String,
            required:true
        },
        message:String
    }
 )
 module.exports=mongoose.model('Contacts',contactSchema)