const mongoose=require("mongoose");
var shortid=require("shortid");

var customerDetails=new mongoose.Schema({
    customerName:{
        type:String,
     required:true
    },
    customerMail:{
        type:String,
     required:true
    },
    customerPassword:{
        type:String,
     required:true
    },
    customerRewardpoints:{
        type:Number,
     required:true
    },
    customerContact:{
        type:Number,
     required:true
    }
});
var customer=new mongoose.Schema({
    customerId:{
     type:String,
     default:shortid.generate()
 },
 customerDetails:customerDetails,
 
 isActive:{
    type:Boolean,
 required:true
}
})



module.exports=mongoose.model("customer",customer);