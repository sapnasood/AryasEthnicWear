$(document).ready(function(){
    $('.tooltipped').tooltip();
    $('.slider').slider();
    $('.dropdown-trigger').dropdown();
    $('#modal1').modal();
    $('select').formSelect();
   });

// This function will pass the department selected by user to getProds function
   const selectDepartment = function(event){
    event.preventDefault();
    console.log($(this).text());
//  This function is to fetch all the items for the department selected by user   
    getProds($(this).text(), '/api/category/');
   };

// -----------------------------------------------------------------------------------------
//  This function makes an ajax Get call to fetch all the items for a selected category  
// ------------------------------------------------------------------------------------------
   const getProds = function(category, apiurl){
    $.ajax(
    {
    method:'GET',
    url:apiurl + `${category}`
    }).then(function(response){
       if(response){
        console.log(response);
// This function will dynamically create cards on html page and load the data        
        loadProducts(response);
       };
       
    });
    };
// ----------------------------------------------------------------------------------------------------    
// This function will dynamically create cards on html page and load the data  
// ----------------------------------------------------------------------------------------------------
    const loadProducts = function(response){
        //    $('#footerSec').empty();
           $('#mainDiv').empty();
           $('#mainDiv').addClass('container');
        //    let cardCont = $('<div>').addClass('container');
           let row = $('<div>').addClass('row center-cols center-align');
           
           for(let i = 0; i < response.length; i++){
              let item = response[i];
              let quantity = 0;
           // let cardCont = $('<div>').addClass('container');
           let col = $('<div>').addClass('col m4');
           let cardDiv = $('<div>').addClass('card');
           let cardImg = $('<div>').addClass('card-image');
           let image = $('<img>').attr('src',item.product_img);
           image.attr('width', '180px');
           image.attr('height', '280px');
           cardImg.append(image);
           
           let cardCon = $('<div>').addClass('card-content');
// Logic to find if product is In stock or Out of Stock           
           if (parseInt(item.stock_quantity) > 0){
               quantity = 'In Stock'
           } 
           else{
               quantity = 'Out of Stock';
             
            };
           
           let price = $('<p>').text(`$ ${item.retail_price}` + " " +`${quantity}`);
           
           cardCon.append(price);
           
           let cardAction = $('<div>').addClass('card-action');
           let prodLink = $(`<a class="product waves-effect waves-light btn" href ="#modal1" data-id=${item.id}>`).text(item.product_name);
// Attaching on click event to cardAction and trigger GET call to DB for selected product            
       if(quantity == 'Out of Stock'){
           prodLink.addClass('disabled');
       };

        prodLink.on('click',function(event){
            event.preventDefault();
            console.log('Sapna');
            let productId = $(this).data("id");
            console.log('ProductId' + productId);
            $.ajax({
            url:`/api/products/${productId}`,
            method:"GET"
            }).then(function(productresp){
                console.log(productresp)
// This function will open a modal so that user can input quantity/size and Click on Add to Cart button               
                productPage(productresp);
            })
        
           })
   
           cardAction.append(prodLink);
           cardDiv.append(cardImg, cardCon, cardAction);
           col.append(cardDiv);
           row.append(col);
           
           }
        
           $('#mainDiv').append(row);
          
           };
               
// Function to open modal and allow user to input size and quantity and click on Add to Cart button
           const productPage = function(productresp){
            $('#modal1').modal('open');
            $('#size').val('');
            $('#quant').val('');
            $('#modalImg').attr('src', productresp.product_img);
            $('#modalImg').attr('width', '400px');
            $('#modalImg').attr('height', '350px');
            $('#productName').text((productresp.product_name).toUpperCase()) ;
            $('#prodid').text(`Product Code: ${productresp.id}`);
            $('.add_cart').attr('data-id',productresp.id);
            };

// ---------------------------------------------------------------------------------------------------------------
// This function is used to search products by Productname 
// ----------------------------------------------------------------------------------------------------------------
    const selectProductName = function(event){
    event.preventDefault();
    console.log($(this).text());
    getProds($(this).text(), '/api/category/productname/');
   };

// ----------------------------------------------------------------------------------------------------------------   
//    This function is used to add the selected products to a cart
// -----------------------------------------------------------------------------------------------------------------   
            const addToCart = function(event){
                
                event.preventDefault();
                let quant = $('#quant').val();
                let size = $('#size').val();
                console.log(quant);
                console.log(size);
                let productId = $(this).attr('data-id');
                console.log(productId);
                $('#modal1').modal('close');
         
                $.ajax({
                    url:`/api/products/${productId}`,
                    method:"GET"
                    }).then(function(productData){
                        console.log('Result from prod')
                        console.log(productData)
// Push the data into cart table   
                  pushToCart(productData, quant, size);
                    })
                };
// -----------------------------------------------------------------------------------------------------
// Function to push the data into Cart table in DB  
// ------------------------------------------------------------------------------------------------------              
                const pushToCart = function(productDatas, quant, size){
                    let productId = productDatas.id;
                    console.log(productId);
                    let dataSet = {
                    product_quant:quant,
                    product_size:size,
                    ProductId:productId
                    }; 
                    
                    $.ajax({
                        url:`/api/products/addtocart`,
                        method:'POST',
                        data:dataSet
                    }
                    ).then(function(response){
                      console.log(response);
                    })
                    
                    };
// ---------------------------------------------------------------------------------------------------------------                    
// This function will create the HTML table componenet to show all the items selected by user to purchase 
// ------------------------------------------------------------------------------------------------------------------
                    const getCart = function(event){
                        event.preventDefault();
                        
                        $.ajax({
                            url:`/api/getcart/`,
                            method:"GET"
                            }).then(function(productData){
                                console.log(productData)
                                $('#mainDiv').empty();
                                let subtotal = 0;
                                let header = $('<h1>').addClass('center');
                                header.text('MY SHOPPING CART');
                                $('#mainDiv').append(header);
                                let row = $('<div>').addClass('row');
                                let col1 = $('<div>').addClass('col m6');
 // Create a table header
                                let table = $('<table>').addClass('table table table-shopping-cart');
                                table.attr('id','table');
                                let thead = $('<thead>');
                                let tr = $('<tr>');
                                let th6 = $('<th>').text('PRODUCTID');
                                let th1 = $('<th>').text('PRODUCT');
                                let th2 = $('<th>').text('TITLE');
                                let th3 = $('<th>').text('QUANTITY');
                                let th4 = $('<th>').text('PRICE');
                                let th5 = $('<th>').text('REMOVE');
                                tr.append(th6,th1, th2, th3, th4, th5);
                                thead.append(tr);
                                table.append(thead);
                                col1.append(table);
                                row.append(col1);
                                
// Create table body  
                    let tbody = $('<tbody>');
                    
                    for(let i = 0; i < productData.length; i++){
                        let price = 0;
                        let tr1 = $('<tr>');
                        let td1 = $('<td>');
                        let td2 = $('<td>');
                        let td3 = $('<td>');
                        let td4 = $('<td>');
                        let td5 = $('<td>');
                        let td6 = $('<td>');
// Logic to display ProductID    
                    let prodId = productData[i].id;
                    td6.append(prodId);
                    tr1.append(td6);
//  Logic to display product image
                        let product_img = productData[i].Product.product_img;
                        let prdImg = $('<img>').attr('src', product_img);
                        prdImg.attr('width', '100px');
                        prdImg.attr('height', '110px');
                        td1.append(prdImg);
                        tr1.append(td1);
// Logic to display product name   
                        let product_name = productData[i].Product.product_name;
                        td2.append(product_name);
                        tr1.append(td2);  
// Logic to display product quantity  
                    let quantity =   productData[i].product_quant;
// Logic to display products proce
                    td3.append(quantity);
                    tr1.append(td3);  
                    if(productData[i].Product.product_type === 'buy'){
                    price = parseInt(quantity) * parseInt(productData[i].Product.retail_price);}
                    else
                    {price = parseInt(quantity) * parseInt(productData[i].Product.rental_price);}
                    subtotal += price;
                    td4.append(price);
                    tr1.append(td4); 
                    tbody.append(tr1);
              
// Add remove button 
                    removeBtn = $(`<a class="waves-effect waves-teal btn-flat" id="remove">`);
                    removeBtn.text("Remove");
                    removeBtn.on('click',function(event){
                    event.preventDefault();
                    
                    let table = document.getElementById('table');
                    let index = 0;
                    
                    for(let i = 0; i < table.rows.length; i++){
                      table.rows[i].cells[5].onclick = function()
                      {
                          index = this.parentElement.rowIndex;
                          let deleteId = table.rows[index].cells[0].innerHTML;
                          let amount = parseInt(table.rows[index].cells[4].innerHTML);
                          subtotal -= amount;
                          console.log('subtotal' + subtotal);
                          subTotal.text(`SUBTOTAL: $ ${subtotal}`);
                          table.deleteRow(index);
// Make ajax call to delete the row from Cart table in database   
                    console.log(deleteId);   
                    $.ajax(
                        {url:`/api/cart/delete/${deleteId}`,
                        method:"DELETE"} 
                    ).then(function(deleteres){
                        if (deleteres.success) {
                            console.log('deleted')
                          }  
                    });
                      }
                    }
                    
                    })
                    td5.append(removeBtn);
                    tr1.append(td5);
                    tbody.append(tr1);
                    };
                    
                    table.append(tbody);
                    col1.append(table);
                    row.append(col1);
                    let col2 = $('<div>').addClass('col m6');  
                    let subTotal = $('<h5>').attr('id','subtotal');
                    subTotal.text(`SUBTOTAL: $ ${subtotal}`);
                    col2.append(subTotal);
                    
                    
                    let checkOutBtn = $(`<a class="waves-effect waves-light btn" id="checkout">`)
                    checkOutBtn.text('CHECKOUT')
// --------------------------------------------------------------------------------------------------------                    
// This function will update the quantity in Products table 
// ---------------------------------------------------------------------------------------------------------                   
                    checkOutBtn.on('click',function(event){
                            event.preventDefault();
                     $.ajax(
                       {url:'/api/cart',
                        method:'GET'
                      }
                     ).then(function(){})
                    
                    })
                    col2.append(checkOutBtn);
                    row.append(col2);
                    
                    $('#mainDiv').append(row);
                    
                    })};
 
   $('#clothing').on('click', selectDepartment);
   $('#jewelry').on('click', selectDepartment); 
   $('#anarkalis').on('click',selectProductName);
   $('#saris').on('click',selectProductName);
   $('#lehengas').on('click',selectProductName);
   $('#rental').on('click', selectDepartment );
   $('.add_cart').on('click', addToCart);
   $('#getcart').on('click',getCart);

