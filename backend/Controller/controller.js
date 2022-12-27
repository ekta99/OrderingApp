var UserModel = require("../Model/userSchema");
var ProductModel = require("../Model/productSchema");
var CartModel = require("../Model/cartSchema");
var OrderModel= require("../Model/orderSchema")
var validators = require("../Utilities/validator");

exports.signUp = async (req, res) => {
  try {
    const getUser = await UserModel.find(
      { username: req.body.username },
      { _id: 0, _v: 0 }
    );
    // console.log(req.body.username)
    if (getUser.length > 0) {
      res.status(404).json({
        message: `user already exists with this email id`,
      });
    } else {
      const newUser = await UserModel.create(req.body);
      res.status(200).json({
        message: "user added sccessfully ",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const findUser = await UserModel.find(
      { username: req.body.username, password: req.body.password },
      { _id: 0, __v: 0 }
    );
    if (findUser.length > 0) {
      res.send({ message:"user logged in" });
    } else {
      res.status(404).json({
        message: "User with this credentials don't exists",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const findUser = await UserModel.find(
      { username: req.params.username },
      { _id: 0, __v: 0 }
    );
    // console.log("finded user ", findUser,req.params.username);
    if (findUser.length > 0) {
      // console.log("inside if ");
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: req.params.username },
        req.body
      );
      // console.log(updatedUser);
      if (updatedUser != null) {
        res.send({ message: "password updated successfully" });
      } else {
        res.status(404).json({
          message: "password can not be updated",
        });
      }
    }else{
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error occured",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const getProducts = await ProductModel.find(
      {},
      { _id: 0, __v: 0, avgRating: 0 }
    );
    if (getProducts.length > 0) {
      res.send(getProducts);
    } else {
      res.status(404).json({
        message: "no products found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const findbyName = await ProductModel.find(
      { productName: req.params.productname },
      { _id: 0, __v: 0, avgRating: 0 }
    );
    if (findbyName.length > 0) {
      res.send(findbyName);
    } else {
      res.status(404).json({
        message: `No product with ${req.params.productname}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const findbyName = await ProductModel.find(
      { productName: req.params.productname },
      { _id: 0, __v: 0 }
    );
    if (findbyName.length > 0) {
      res.send(findbyName);
    } else {
      res.status(404).json({
        message: `No product details with ${req.params.productname}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllDeals = async (req, res) => {
  try {
    const deals = await ProductModel.find(
      {},
      { _id: 0, productName: 1, discountPercentage: 1 }
    );
    if (deals.length > 0) {
      res.send(deals);
    } else {
      res.status(404).json({
        message: "there are no deals ",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const viewCart = await CartModel.find(
      { username: req.params.username },
      { _id: 0 }
    );
    if (viewCart.length > 0) {
      res.send(viewCart);
    } else {
      res.status(404).json({
        message: "Your cart is empty",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ username: req.params.username });
    const item = await ProductModel.findOne({
      productName: req.body.productName,
    });
    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const cost = item.cost;
    const productPicture = item.productPicture;
    const discountPercentage= item.discountPercentage;
    const productName = item.productName;
    const manufacturer = item.manufacturer;
    const deliveryCharge = item.deliveryCharge;
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productName == req.body.productName
      );
      //check if product exists or not
      if (itemIndex > -1) {
        // console.log("inside item index > -1");
        let product = cart.items[itemIndex];
        product.quantity += Number(req.body.quantity);
        if(product.quantity>4){
          res.status(400).json({
            message:"item from one seller never exceeds 4"
          })
        }else{
          cart.grandtotal = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.cost + curr.deliveryCharge - curr.quantity*curr.cost*curr.discountPercentage*0.01;
          }, 0);
          cart.totalprice = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.cost- curr.quantity*curr.cost*curr.discountPercentage*0.01;
          }, 0);
          cart.totaldeliverycharge = cart.items.reduce((acc, curr) => {
            return acc + curr.deliveryCharge;
          }, 0);
          cart.totalDiscount = cart.items.reduce((acc,curr)=>{
            return acc+curr.quantity*curr.discountPercentage*0.01*curr.cost;
          },0)
          cart.dateOfOrder = null;
          cart.items[itemIndex] = product;
          
          await cart.save();
          res.status(200).send({ message: "item successfully added in cart " });
        }
        
      } else {
        // console.log("inside else ")
        cart.dateOfOrder =null;
        const quantity = req.body.quantity;
        const total = req.body.quantity * item.cost - req.body.quantity* item.discountPercentage*item.cost*0.01;

        cart.items.push({
          productName,
          productPicture,
          manufacturer,
          discountPercentage,
          cost,
          deliveryCharge,
          quantity,
          total,
        });
        cart.grandtotal = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.cost + curr.deliveryCharge - curr.quantity*curr.cost*curr.discountPercentage*0.01;
        }, 0);
        cart.totalprice = cart.items.reduce((acc, curr) => {
          // console.log(curr)
          return acc + curr.quantity * curr.cost - curr.quantity*curr.cost*curr.discountPercentage*0.01;
        }, 0);
        cart.totaldeliverycharge = cart.items.reduce((acc, curr) => {
          return acc + curr.deliveryCharge;
        }, 0);
        cart.totalDiscount = cart.items.reduce((acc,curr)=>{
          return acc+curr.quantity*curr.discountPercentage*0.01*curr.cost;
        },0)
        await cart.save();
        res.status(200).send({ message: "item successfully added in cart " });
      }
    } else {
      //no cart exists, create one
      // console.log("inside no cart exists", item);
      // console.log("user name is ", req.params.username)
      const uname = req.params.username;
      const quantity = req.body.quantity;
      const total = req.body.quantity * item.cost - req.body.quantity * item.cost*item.discountPercentage*0.01;
      const deliveryCharge = item.deliveryCharge;
      const totalDiscount = req.body.quantity * item.cost*item.discountPercentage*0.01;
      // console.log(deliveryCharge, total);
      const newCart = await CartModel.create({
        username: uname,
        dateOfOrder: null,
        totaldeliverycharge: deliveryCharge,
        totalprice: total,
        grandtotal: total + deliveryCharge,
        totalDiscount:totalDiscount,
        items: [
          { productName,productPicture, manufacturer,discountPercentage, cost, deliveryCharge, quantity, total },
        ],
      });
      return res
        .status(201)
        .send({ message: "item successfully added in cart " });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ username: req.params.username });
    const item = await ProductModel.findOne({
      productName: req.body.productName,
    });
    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productName == req.body.productName
      );
      //check if product exists or not
      if (itemIndex > -1) {
          // console.log("inside item index > -1");
        if(req.body.quantity>0){
          let product = cart.items[itemIndex];
        product.quantity = req.body.quantity;
        cart.items[itemIndex] = product;
        }else{
          cart.items.splice(itemIndex,1);
        }
        cart.grandtotal = cart.items.reduce((acc, curr) => {
          // console.log(curr.cost + curr.deliveryCharge - curr.cost * curr.discountPercentage*0.01);
          return acc + curr.quantity * curr.cost + curr.deliveryCharge - curr.quantity*curr.cost * curr.discountPercentage*0.01;
        }, 0);
        cart.totalprice = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.cost - curr.quantity*curr.cost*curr.discountPercentage*0.01;
        }, 0);
        cart.totaldeliverycharge = cart.items.reduce((acc, curr) => {
          return acc + curr.deliveryCharge;
        }, 0);
        cart.totalDiscount = cart.items.reduce((acc,curr)=>{
          return acc+curr.quantity*curr.discountPercentage*0.01*curr.cost;
        },0)
        cart.dateOfOrder = null;
      
        await cart.save();
        res.status(200).send(cart);
        
      } else {
        res.status(404).json({
          message: "item is not found in the cart",
        });
      }
    } else {
      //no cart exists, create one
      res.status(404).json({
        message: "cart does not exists for user",
      });
    }
  } catch (err) {
    res.status(500).json({
      staus: "fail",
      message: err.message,
    });
  }
};

exports.order= async (req,res)=>{
    try{
      // console.log(req.params.username)
        const cart = await CartModel.findOne({ username: req.params.username });
        // console.log('cart is ',cart)
        if(cart){
            // const payload = {cart.username}
            
            // console.log("before order creation",payload)
            const ordered = await OrderModel.create({
              username :cart.username,
              dateOfOrder :new Date(),
              totalprice :cart.totalprice,
              totaldeliverycharge :cart.totaldeliverycharge,
              grandtotal :cart.grandtotal,
              totalDiscount:cart.totalDiscount,
              items:cart.items
            });
            // console.log(ordered)
            const deleted = await CartModel.findOneAndDelete({username:req.params.username})
            // console.log(deleted);
            res.send({message:"items ordered successfully "})
        }else{
            res.status(406).json({
                message:"there are no items in cart to order"
            })
        }
        
    }catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.vieworders= async (req,res)=>{
  try{
    const orders = await OrderModel.find({ username: req.params.username }).sort({ dateOfOrder: -1 })
    if(orders){
      res.send(orders)
    }else{
      res.status(404).json({
        message:"no orders found"
      })
    }

  }catch(err){
    res.status(500).json({
      message : err.message
    })
  }
}