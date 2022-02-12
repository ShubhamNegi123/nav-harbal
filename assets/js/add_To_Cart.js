$(function () {

    
    
    /* normal functions for page 
            |   
            |
            |
            |
           \ /
            *
    
    */
    $('.add-to-cart-icon').click(function(){
        window.location.href = "add-to-cart.html";
    });
    $('.add-to-bag-icon').click(function(){
        window.location.href = "add-to-wishlist.html";
    });  

    // function for showing sidebar image on main image wrapper
    let image = $('.products-img img').attr('src');
    $('.product-sidebr .sidebar-img').mouseover(function () {
        var src = $(this).attr('src');
        //console.log(src);
        $(' .products-img img').attr('src', src);
    });

    $('.all-products .product-sidebr .sidebar-img').mouseout(function () {
        $('.products-img img').attr('src', image);
    });

    //  function for showing product details
    $('.more-click').click(function () {       


        if ($('.more-click i').hasClass("fas fa-chevron-down")) {
            $('.more-click i').attr('class', 'fas fa-chevron-right');
        } else {
            $('.more-click i').attr('class', 'fas fa-chevron-down')
        }

        $('.all-about-product').slideToggle();
    });




    
    // getting cart icon number value
    let totalItemsIntoCart = $('.add-to-cart-button-quantity').text();
    console.log(`totalItemsIntoCart = ${totalItemsIntoCart}`);
    totalItemsIntoCart = parseInt(totalItemsIntoCart);



    // getting cart quantity number value
    let totalItemsquantityIntoCart = $('.quantity').text();
    totalItemsquantityIntoCart = parseInt(totalItemsquantityIntoCart);

    $('.add-to-card-button').click(function () {
        $('.message').text('Item added to the Cart');
        $('.message').css({
            opacity: '1',
            visibility: 'visible',
            top: '100px',
            transition: 'all .3s ease'
        });    
        setTimeout(() => {
            $('.message').css({
                opacity: '0',
                visibility: 'hidden',
                top: '0px'
            });  
        }, 700);  
    });

    $('.wishlist-button').click(function () {
        $('.message').text('Item added to the wishlist');
        $('.message').css({
            opacity: '1',
            visibility: 'visible',
            top: '100px',
            transition: 'all .3s ease'
        });    
        setTimeout(() => {
            $('.message').css({
                opacity: '0',
                visibility: 'hidden',
                top: '0px'
            });  
        }, 700);  
    });


   


    let totalItemsIntowishlist = $('.add-to-bag-button-quantity').text();
    totalItemsIntowishlist = parseInt(totalItemsIntowishlist);

    /* all functions for add to  cart 
            |   
            |
            |
            |
           \ /
            *
    
    */
    // function for add to cart button click
    
    // showing cart
    /* ShowingCart(); */


    /* function addToCard(pId, pName, pPrice, pQuantity, pPhoto) {
        let cart = localStorage.getItem('cart');
        if (cart == null || cart == '' || cart == 0) {
            // no cart
            let products = []

            // assigning values
            let product = {
                // es6 same name cunctionality 
                pId,
                pName,
                pPrice,
                pQuantity,
                pPhoto
            }

            // pushing item into array
            products.push(product);

            // adding products into cart
            localStorage.setItem('cart', JSON.stringify(products));
            //console.log('product is added first time');

        } else {
            // cart is present then
            let pcart = JSON.parse(cart);

            // finding exisiting cart
            let oldProduct = pcart.find((item) => item.pId == pId);


            // if we find old product
            if (oldProduct) {
                // only increase quantity of existing product
                oldProduct.pQuantity = parseInt(oldProduct.pQuantity) + 1;

                // checking existing item id
                pcart.map((item) => {

                    if (item.pId == oldProduct.pId) {
                        item.pQuantity = oldProduct.pQuantity;
                    }

                });
                // updating new quantity inti cart
                localStorage.setItem('cart', JSON.stringify(pcart));
                //console.log(' existing product quantity is increased');

            } else {
                // add new product
                // assigning values
                let product = {
                    pId,
                    pName,
                    pPrice,
                    pQuantity,
                    pPhoto
                }

                // adding new cart  into cart
                pcart.push(product);

                localStorage.setItem('cart', JSON.stringify(pcart));
                //console.log(' new product is added ');

            }
        }

        ShowingCart();
    } */

    // updating and showing cart
    /* function ShowingCart() {
        let cartString = localStorage.getItem('cart');
        let cart = JSON.parse(cartString);

        // if cart is empty
        if (cart == null || cart.length == 0 || cart == undefined) {
            //console.log('cart is empty');
            totalItemsIntoCart = 0;
            $('.add-to-cart-button-quantity').text(totalItemsIntoCart);

            totalItemsquantityIntoCart = 0;
            $('.quantity').text(totalItemsquantityIntoCart);

            $('.cart-sidebar').html(`<p>Cart is empty</p>`);
            $('.sub-total-amount').text(0);
         

        }  else {
            //cart is avilavle
            //console.log('cart is avilable');
    
            // getting value of total items  on bag
            totalItemsIntoCart = cart.length;
            $('.add-to-cart-button-quantity').text(totalItemsIntoCart);
    
            totalItemsquantityIntoCart = cart.length;
            $('.quantity').text(totalItemsquantityIntoCart);
    
            let ourCart = `
                <div class="row">          
            
                `;
            let totalPrice = 0;
            cart.map((item) => {
                ourCart += `
                <div class="col-lg-5">
                    <div class="card card1">
                        <div class="d-flex ">
                            <div class="product-img">
                                <img src="${item.pPhoto}" alt="">
                                <br>
                            </div>
                            <div class="details text-center">
                                <span class="name">${item.pName}</span>
                                <br>
                                <span class="decrease">-</span>
                                <input type="text" min="1" max="" class="number-of-product" value="${item.pQuantity}">
                                <span class="increase">+</span>
                                <p>Rs. <span class="product-amount">${item.pPrice * item.pQuantity}</span></p>
                            </div>
                            <div class="remove-from-card " id="${item.pId}">
                                <i class="far fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2"></div>
                    `;
                totalPrice = item.pPrice * item.pQuantity;
            });
    
            ourCart = ourCart + `</div>`;
    
            $('.cart-sidebar').html(ourCart);
            $('.sub-total-amount').text(totalPrice);
    
    
    
            // function for descreasing product quantity
            $('.card .details .decrease').click(function () {
                let numberOfProductsIn = parseInt($('.card .details .number-of-product').val());
                if (numberOfProductsIn == 1) {
                    numberOfProductsIn = 1
                } else {
                    console.log('numberOfProductsIn before decrease = ' + numberOfProductsIn);
                    numberOfProductsIn = numberOfProductsIn - 1;
                    $('.number-of-product').attr('value', numberOfProductsIn);
                    let thisProductAmount = parseInt(productAmount) * numberOfProductsIn;
                    $('.product-amount').text(thisProductAmount);
                    $('.sub-total-amount').text(thisProductAmount);
                    addToCard(id, productName, productAmount, numberOfProductsIn, productImg);
                    console.log('numberOfProductsIn after decrease = ' + numberOfProductsIn);
                }
            });
    
            $('.card .details .increase').click(function () {
                let numberOfProducts = parseInt($('.card .details .number-of-product').val());
                console.log('numberOfProductsIn before decrease = ' + numberOfProducts);
    
                numberOfProducts = numberOfProducts + 1;
                $('.number-of-product').attr('value', numberOfProducts);
                let thisProductAmount = parseInt(productAmount) * numberOfProducts;
                $('.product-amount').text(thisProductAmount);
                $('.sub-total-amount').text(thisProductAmount);
                addToCard(id, productName, productAmount, numberOfProducts, productImg);
                console.log('numberOfProductsIn after decrease = ' + numberOfProducts);
    
    
            });
    
    
            // function for increasing product quantity            
    
    
    
    
            // function for changing input values
            $('.number-of-product').change(function () {
                let numberOfProducts = parseInt($('.card .details .number-of-product').val());
                $('.number-of-product').attr('value', numberOfProducts);
                let thisProductAmount = parseInt(productAmount) * numberOfProducts;
                $('.product-amount').text(thisProductAmount);
                $('.sub-total-amount').text(thisProductAmount);
    
            });
    
    
    
            // function for remove from card
    
    
    
            // function for deleting item from cart
    
        }
    } */

    /* remove from cart */
    /* function remove_Item_From_Cart(cart_id){
        id = cart_id;
        alert(id);
    } */
    /* let cartRId = $('.remove-from-card').attr('id');
    $(document).on('click', '.remove-from-card', function (cartRId) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let newUpdatedCart = cart.filter((item) => item.pId != cartRId);
        let Nocart = localStorage.setItem('cart', JSON.stringify(newUpdatedCart));
        if (Nocart == null || Nocart == '' || Nocart == 0) {
            localStorage.removeItem('cart');
            ShowingCart();
            console.log(cartRId+'=cart is removed');
        }

    }); */




    /* all functions for add to wishlist 
            |   
            |
            |
            |
           \ /
            *
    
    */



    // function for add to cart button click
    /* $('.wishlist-button').click(function () {       
        $('.message').text('Item added to the Bag');
        $('.message').css({
            opacity: '1',
            visibility: 'visible',
            top: '100px',
            transition: 'all .3s ease'
        });    
        setTimeout(() => {
            $('.message').css({
                opacity: '0',
                visibility: 'hidden',
                top: '0px'
            });  
        }, 700);  
    }); */


   /*  function addToWishlist(pId, pName, pPrice, pQuantity, pPhoto) {
        let Wishlist = localStorage.getItem('Wishlist');
        if (Wishlist === null) {
            // no Wishlist
            let products = []

            // assigning values
            let product = {
                // es6 same name cunctionality 
                pId,
                pName,
                pPrice,
                pQuantity,
                pPhoto
            }

            // pushing item into array
            products.push(product);

            // adding products into Wishlist
            localStorage.setItem('Wishlist', JSON.stringify(products));
            //console.log('product is added first time');

        } else {
            // Wishlist is present then
            let pcart = JSON.parse(Wishlist);


            // finding exisiting cart
            let oldProduct = pcart.find((item) => item.pId == pId);


            // if we find old product
            if (oldProduct) {
                // only increase quantity of existing product
                oldProduct.pQuantity = parseInt(oldProduct.pQuantity) + 1;

                // checking existing item id
                pcart.map((item) => {

                    if (item.pId == oldProduct.pId) {
                        item.pQuantity = oldProduct.pQuantity;
                    }

                });
                // updating new quantity inti cart
                localStorage.setItem('cart', JSON.stringify(pcart));
                //console.log(' existing product quantity is increased');

            } else {
                // add new product
                // assigning values
                let product = {
                    pId,
                    pName,
                    pPrice,
                    pQuantity,
                    pPhoto
                }

                // adding new cart  into cart
                pcart.push(product);

                localStorage.setItem('cart', JSON.stringify(pcart));
                //console.log(' new product is added ');

            }
        }
        ShowingWishlist();
    }
 */
    /* ShowingWishlist();
    function ShowingWishlist() {
        let wishlistString = localStorage.getItem('Wishlist');
        let wishlist = JSON.parse(wishlistString);
        // if cart is empty
        if (wishlist == null || wishlist.length == 0) {
            $('.wishlist').html('<h2 class="text-center my-5">Wishlist is empty</h2>');
            let totalItemsIntowishlist = 0;
            $('.add-to-bag-button-quantity').text(totalItemsIntowishlist);
        } else {

            // getting value of total items  on bag
            let totalItemsIntowishlist = wishlist.length;
            $('.add-to-bag-button-quantity').text(totalItemsIntowishlist);


            let ourWishlist = `
             <div class="row">
             `;

            wishlist.map((item) => {
                ourWishlist += `
                <div class="col-lg-4">
                    <div class="product-card">
                        <div class="products-img-wrapper">
                            <img src="${item.pPhoto}" alt="free-shiping-img">
                        </div>
                        <h3>${item.pName}</h3>
                        <p>INR <span class="wishlist-pPrice">${item.pPrice}</span></p>
                        <p class="remove-from-wishlist" id='${item.pId}'>Remove from wishlist</p>
                    </div>
                </div>
                `;
            });
            ourWishlist = ourWishlist + `</div>`;

            $('.wishlist').html(ourWishlist);

        }
    } */

    /*     remove from wishlist
     */
    /* let wishliatRId = $('.remove-from-wishlist').attr('id')
    $(document).on('click', '.remove-from-wishlist', function () {
        let wishlist = JSON.parse(localStorage.getItem('Wishlist'));
        let newUpdatedwishlist = wishlist.filter((item) => item.pId != wishliatRId);
        let Newwishlist = localStorage.setItem('Wishlist', JSON.stringify(newUpdatedwishlist));
        if (Newwishlist == null || Newwishlist == '' || Newwishlist == 0) {
            localStorage.removeItem('Wishlist');
            $('.total-items-into-wishlist').text(0);
            ShowingWishlist();   
        }else{
            $('.add-to-bag-button-quantity').text(totalItemsIntowishlist);;
        }

    }); */


});