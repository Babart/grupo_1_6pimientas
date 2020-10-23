var express = require('express');
var router = express.Router();

const path = require ('path');
const productsController = require ('../controllers/productsController')
const validateProducts = require ('../validators/products/products')

const multer = require('multer');
var storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/products'),
    filename: function (req, file, cb) {
      cb(null, 'product' + '-' + Date.now() + path.extname(file.originalname))
    }
  });
   
   
var upload = multer({ storage });

/* Páginas de productos */

router.get("/", productsController.products);

 
router.get("/productCart", productsController.productCart);
router.post("/productCart"  , productsController.purchase);
  
router.get("/add", productsController.add);

router.post("/", upload.single('image'), validateProducts.create, productsController.store);

router.get('/admin', productsController.productAdmin)

router.post("/edit", validateProducts.editProduct, productsController.edit);
// para editar
router.put("/:id", upload.single('image'), validateProducts.editProduct, productsController.update);
//para eliminar
router.delete('/delete/:id', productsController.destroy);

router.post('/productCart', productsController.addProduct);

router.delete('/productCart', productsController.deleteProductBag);
module.exports = router;