var express = require('express');
var router = express.Router();
var controller = require('../Controller/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',controller.signUp);
router.post('/login',controller.login);
router.post('/:username/update',controller.updatePassword);

router.get('/products',controller.getAllProducts);
router.get('/searchproduct/:productname',controller.getProductByName);
router.get('/:productname/details',controller.getProductDetails);
router.get('/deals',controller.getAllDeals);
router.get('/:username/cart',controller.viewCart);
router.post('/:username/updatecart',controller.updateCart);
router.post('/:username/addtocart',controller.addToCart);
router.post('/:username/orders',controller.order);
router.get('/:username/vieworders',controller.vieworders);

module.exports = router;
