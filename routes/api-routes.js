const express = require("express");
const path = require("path");

//Import in our db models
const db = require('../models');

const router = express.Router();


// GET Request
// Responds with products for the requested category
router.get('/api/category/:category', function(req, res){
db.Products.findAll({where : {category: req.params.category}})
.then(function(data){
    res.json(data);
}).catch(function(error){
    res.json({ error: error });
})
});

router.get('/api/products/:productId', function(req, res){
    db.Products.findOne({where:{id:req.params.productId}})
    .then(function(data){
        res.json(data);
    }).catch(function(error){
        res.json({ error: error });
    })
    });

// Responds with products for the requested product name under specific category
router.get('/api/category/productname/:productname', function(req, res){
    db.Products.findAll({where : {product_name: req.params.productname}})
    .then(function(data){
        res.json(data);
    }).catch(function(error){
        res.json({ error: error });
    })
    });  
    
router.post('/api/products/addtocart',function(req, res){
    db.Cart_data.create(req.body).then(function(){
        res.json({success: true});
      }).catch(function(error){
        res.json({error: error});
      })


})    

router.get('/api/getcart/', function(req, res){
   db.Cart_data.findAll({include:[{model:db.Products}]}).then(function(cart){
    res.json(cart);
  }).catch(function(error){
    res.json({error: error});
  })


})

router.delete('/api/cart/delete/:id', function(req, res) {
    db.Cart_data.destroy({ 
      where: { id: req.params.id } 
    }).then(function() {
      res.json({ success: true });
    }).catch(function(error) {
      res.json({ error: error });
    });
  });


  router.get('/api/cart', function(req, res){
    db.Cart_data.findAll({}).then(function(cartdata){
     for(let i = 0; i < cartdata.length; i++){
     let prodId = cartdata[i].ProductId;
     let quantity = cartdata[i].product_quant;
     let prodQuant = 0;
     let stock = 0;
   
   db.Products.findOne({where:{id:prodId}}).then(function(prodData) {
       prodQuan = prodData.stock_quantity;
       stock = prodQuan-quantity;
       let data = {
           stock_quantity:stock
          }
          db.Products.update(
            data,
            { where: { id: prodId } }  
          ).then(function() {
   
         }).catch(function(error) {
            res.json({ error: error });
          });
        
     }).catch(function(error) {
       res.json({ error: error });
     });
   
     
    }
// Delete entry from Cart table
// db.Cart_data.destroy({}).then(function(){
//   res.json({ success: true });
// }).catch(function(error) {
//   res.json({ error: error });


// });

   })
   
   
   })


module.exports = router;