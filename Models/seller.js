const mongoose=require("mongoose");
var shortid=require("shortid");

var sellerAddress=new mongoose.Schema({
    city:
    {
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
   
});
var sellerDetails=new mongoose.Schema({
    sellerName:{
        type:String,
     required:true
    },
    sellerAddress:sellerAddress,
    sellerContact:{
        type:Number,
     required:true
    },
    sellerProof: {
        type:String,
     required:true
    },
   
});
var seller=new mongoose.Schema({
 sellerId:{
     type:String,
     default:shortid.generate()
 },
 sellerDetails:sellerDetails,
 
 isActive:{
    type:Boolean,
 required:true
}
})



module.exports=mongoose.model("seller",seller);