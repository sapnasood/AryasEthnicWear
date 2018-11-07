const db = require('../models');

const items = [
    {
      product_name: "anarkalis",
      product_img: "https://cdn.shopify.com/s/files/1/1384/4105/products/wonderful-taupe-net-long-embroidered-lehenga_800x_a84eab96-131d-42b6-b9c0-5d3f0f4862df_1024x1024.jpg?v=1483096212",
      category: "clothing",
      rental_price: 45,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

     { product_name: "anarkalis",
      product_img: "http://fashionclozet.com/image/cache/catalog/Suits/A_December/7_Maisha_3/5105-800x1100.jpg",
      category: "clothing",
      rental_price: 35,
      retail_price: 230,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "sari",
      product_img: "https://salwarweb.com/image/cache/data/satin-wedding-wear-orange-heavy-embroidery-work-saree-507-800x1100.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 


      { product_name: "sari",
      product_img: "http://sc02.alicdn.com/kf/UT8SyN7XZ4XXXagOFbXX/2017-new-design-Heavy-Silk-Half-Fancy.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "lehengas",
      product_img: "https://www.natashacouture.com/blog/wp-content/uploads/2018/02/11.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "lehengas",
      product_img: "https://i.pinimg.com/originals/87/f8/f0/87f8f0d8c527fa284bc7cfffb3de641b.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "bridal",
      product_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFiW6S_tsjjig_DQtseZ64jv7po9ljUQobDyBf5xun0WNBQ_C3A",
      category: "jewelry",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "bridal",
      product_img: "https://www.picclickimg.com/d/l400/pict/273026594487_/Indian-Bollywood-Fashion-Ethnic-Wedding-Bridal-Gold-Plated.jpg",
      category: "jewelry",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "bridal",
      product_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1j6Y0YU6jJUpZ9S73mYr4FFVKm4aF4gEu0pW3R5XOzeyD1UZ",
      category: "jewelry",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      }, 

      { product_name: "bridal",
      product_img: "https://i.ebayimg.com/images/g/PwgAAOxyGxxSJcoz/s-l640.jpg",
      category: "jewelry",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10,
      product_type: 'buy'
      },

// Rental costume   
{ product_name: "Multicolor Flowy Long Tops",
product_img: "https://www.bollywoodshake.com/uploads/2/1/9/6/2196600/img-1407_orig.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},  

{ product_name: "Semi-Classical Top Gold",
product_img: "https://www.bollywoodshake.com/uploads/2/1/9/6/2196600/__3647467_orig.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},  

{ product_name: "Garba Lehenga",
product_img: "https://www.bollywoodshake.com/uploads/2/1/9/6/2196600/img-0884_orig.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},  

{ product_name: "Blue Nimbooda Lehenga",
product_img: "https://www.bollywoodshake.com/uploads/2/1/9/6/2196600/____7064360_orig.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
}, 

{ product_name: "Fuchsia and Gold Tops with Headbands",
product_img: "http://www.rhythmaya.com/wp-content/uploads/2014/04/007-FuschiaTops-150x150.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},

{ product_name: "Gold and Pink Kurti Tops with Gold Leggings" ,
product_img: "https://www.bollywoodshake.com/uploads/2/1/9/6/2196600/__667405_orig.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},

{ product_name: "Bridal Set" ,
product_img: "http://www.sagunthalajewellers.com/images/jewels/kundan-sets/kundan-2.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},

{ product_name: "Bridal Set" ,
product_img: "https://assetscdn1.paytm.com/images/catalog/product/J/JE/JEWURBANELA-PARQUEE3243035734A502/1..jpeg?imwidth=282&impolicy=hq",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},

{ product_name: "Bridal Set" ,
product_img: "https://n4.sdlcdn.com/imgs/b/f/g/Lucky-Jewellery-Golden-Traditional-Necklace-SDL739915850-1-cdc95.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
},

{ product_name: "Bridal Set" ,
product_img: "https://cdn.shopclues.com/images/thumbnails/8320/320/320/VKNKZ1048G1414405048.jpg",
category: "rental",
rental_price: 25,
retail_price: 330,
stock_quantity: 10,
product_type: 'rental'
}


    ]    

    db.sequelize.sync({force: true}).then(function() {
        db.Products.bulkCreate(items).then(function(rows) {
          console.log('\n\nINSERTED\n\n');
        }).catch(function(err) {
          console.log('\n\nError:', err);
        });
      });