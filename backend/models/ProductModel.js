const mongoose =require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
name:{
    type:String,
    required:[true,"Please Enter the Product Name"]
},
description:{
    type:String,
    required:[true,"Please Enter the Product Description"]
},
Price:{
    type:Number,
    required:[true,"Please Enter the Product Price"],
    maxLength:[8,"Price cannot exceed 8 Characters"]
},
rating:{
    type:Number,
    default:0
},
image:[
    {
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true

    }
}
],
category:{
type:String,
required:[true,"Please Enter the Product Category"]
},
Stock:{
    type:Number,
    required:[true,"Please Enter the Product Stock"],
    maxLength:[4,"Stock cannot exceed 4 characters"],
    default:1

},
noOfReviews:{
    type:Number,
    dafault:0
},
reviews:[
{
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
}
],
createdAt:{
    type:Date,
    default:Date.Now
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
}
});
module.exports=mongoose.model("Product",productSchema);
