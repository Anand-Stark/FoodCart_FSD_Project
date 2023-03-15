const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const productAdminSchema = new Schema({
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
      userId:{
         type:Schema.Types.ObjectId,
         ref:'User',
         required:true
      }

})


module.exports = mongoose.model('AdminProducts', productAdminSchema) ; 