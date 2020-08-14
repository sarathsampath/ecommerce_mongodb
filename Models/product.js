const mongoose=require("mongoose");
const shortid=require("shortid")

var productDetails=new mongoose.Schema({
    productId:
    {type:String,
    default:shortid.generate()}
        ,
    productName:{
        type:String,
     required:true
    },
    productPrice:{
        type:Number,
     required:true
    },
    productDiscount:
    {
        type:Number,
        required:true
    },
    productStock: {
        type:Number,
     required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    }
   
});
var product=new mongoose.Schema({
 
 sellerId:{
    type:String,
    required:true
 },
 productDetails:productDetails,
 
 isActive:{
    type:Boolean,
 required:true
}
})



module.exports=mongoose.model("product",product);