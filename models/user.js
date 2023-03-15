const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const userSchema = new Schema({
      userName :{
          type:String,
          required:true
      },
      email:{
         type:String,
         required:true
      },
      cart:{
         items:[
            {
                 productId:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'AdminProducts'
                 },
                 Quantity:{
                     type:Number,
                      
                 }
            }
         ]
      }
})

module.exports = mongoose.model('User', userSchema);