const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const adminSchema = new Schema({
      adminName :{
          type:String,
          required:true
      },
      email:{
         type:String,
         required:true
      },
      adminCart:{
         items:[
            {
                 productId:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'VendorProducts'
                 },
                 Quantity:{
                     type:Number,
                      
                 }
            }
         ]
      }
})

module.exports = mongoose.model('Admin', adminSchema);