const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const productVendorSchema = new Schema({
      imageUrl:{
         type:String,
         requires:true
      },
      title:{
        type:String,
        required:true
      },
      price:{
         type:Number,
         required:true
      },
      description:{
         type:String,
         required:true
      },
      rating:{
         type: Number,
         required:true
      },
      adminId:{
         type:Schema.Types.ObjectId,
         ref:'Admin'
      }

})


module.exports = mongoose.model('VendorProducts', productVendorSchema) ; 