const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ekart',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }) .then(() => console.log('DB connection successful!'));

const productSchema = new mongoose.Schema({
    productPicture:{
        type:String,
    },
    productName:{
        type:String,
    },
    manufacturer:{
        type:String,
    },
    cost:{
        type:Number,
    },
    rating:{
        type:String,
    },
    description:{
        type:String,
    },
    colors:{
        type:[String],
    },
    discountPercentage:{
        type:Number,
    },
    deliveryCharge:{
        type:Number,
    },
    avgRating: {
        reviews: [
          {      
            rating:{type: String},
            reviewComments:{type:String}
          },
          {
            rating:{type:String},
            reviewComments:{type:String}
          }
        ]
      }
      
},
{
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
)

const ProductModel = mongoose.model('product',productSchema);
module.exports = ProductModel