const mongoose=require('mongoose')
const router=require('express').Router()
const Contact=require('../models/contactUs')

router.post(`/add-contact/`,(req,res)=>{
    console.log(req.body)
    const contact=new Contact(req.body);
    contact.save()
        .then((contact)=>{
            res.status(200).send("Query added successfully");
        })
        .catch((err)=>{
            res.status(400).send('adding data failed');
        });
});
module.exports=router
