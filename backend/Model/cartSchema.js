const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ekart',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }) .then(() => console.log('DB connection successful!'));

const cartSchema = new mongoose.Schema({
             username :{type: String,
            unique:true},
             dateOfOrder :{type: Date},
             totalprice :{type :Number},
             totaldeliverycharge :{type :Number},
             grandtotal : {type : Number},
             totalDiscount:{type:Number},
             items :[
                    {
                     productName :{type: String},
                     productPicture:{type:String},
                     manufacturer :{type: String},
                     discountPercentage:{type: Number},
                     cost :{type: Number},
                     deliveryCharge :{type: Number},
                     quantity :{type: Number},
                     total :{type: Number},
                    }
                ]
            }
)

const CartModel = mongoose.model('cart',cartSchema);
module.exports = CartModel