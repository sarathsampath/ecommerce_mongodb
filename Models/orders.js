const mongoose=require("mongoose")
const shortid=require("shortid")


var customerDetails=new mongoose.Schema({
    customerName:{
        type:String,
     required:true
    },
    customerMail:{
        type:String,
     required:true
    },
    customerContact:{
        type:Number,
     required:true
    }
});



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

const order=new mongoose.Schema({
    orderId:{
        type:String,
        default:shortid.generate()
     },
    customerId:{
        type:String,
        required:true
     },
    products:[productDetails],
    productTotal:{
        type:Number,
        required:true
     },
    customerDetails:customerDetails,
    orderedDate:
    {
        type:Date,
        default:Date.now
    }
     
})


module.exports=mongoose.model("order",order );