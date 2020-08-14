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
    productQuantity: {
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
var cart=new mongoose.Schema({
 
 customerId:{
    type:String,
    required:true
 },
 cartProducts:[productDetails],
 
 isActive:{
    type:Boolean,
 required:true
}
})



module.exports=mongoose.model("cart",cart);