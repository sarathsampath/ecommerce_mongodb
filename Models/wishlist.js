const mongoose=require("mongoose");

var productDetails=new mongoose.Schema({
    productId:
    {type:String,
    required:true
    }
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
    productWishlistedDate:{
        type:Date,
        default:Date.now()
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
var wishlist=new mongoose.Schema({
 
 customerId:{
    type:String,
    required:true
 },
 wishlistProducts:[productDetails],
 
 isActive:{
    type:Boolean,
 required:true
}
})



module.exports=mongoose.model("wishlist",wishlist);