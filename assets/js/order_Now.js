/* 
            functions for add to  cart button click
                          |   
                          |
                          |
                          |
                         \ /
                          *
  
 */
/* add to cart function */
function addToCard(pId, pName, pPrice, pQuantity, pPhoto) {
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
}
/* 
             functions for showing cart 
                           |   
                           |
                           |
                           |
                          \ /
                           *
   
*/
/* showing cart */
function ShowingCart() {
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

        $('.checkout-button a').attr('href','#');

    } else {
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
            <div class="col-lg-12">
                <div class="card card1">
                    <div class="d-flex ">
                        <div class="product-img">
                            <img src="${item.pPhoto}" alt="">
                            <br>
                        </div>
                        <div class="details text-center">
                            <span class="name">${item.pName}</span>
                            <br>
                            <span class="decrease" onclick="decrease_Quantity('${item.pId}')">-</span>
                            <input type="text" min="1" max="" class="number-of-product" value="${item.pQuantity}" onchange="change_quantity('${item.pId}')">
                            <span class="increase" onclick="increase_Quantity('${item.pId}')">+</span>
                            <p>Rs. <span class="product-amount">${item.pPrice * item.pQuantity}</span></p>
                            <a href="checkout.html" class="order-now-button">Order now</a>
                        </div>
                        <div class="remove-from-card " onclick="remove_Item_From_Cart('${item.pId}')" >
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

        $('.checkout-button a').attr('href','checkout.html');
    }
}
/* removing cart */


function remove_Item_From_Cart(cart_id) {

    $('.message').text('Item remove from cart ');
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



    let id = cart_id;
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newUpdatedCart = cart.filter((item) => item.pId != id);
    let Nocart = localStorage.setItem('cart', JSON.stringify(newUpdatedCart));
    console.log(id + '=single cart is removed');
    ShowingCart();
}
ShowingCart();

function increase_Quantity(pid) {
    let id = pid;
    let cart = localStorage.getItem('cart');
    let pcart = JSON.parse(cart);
    let oldProduct = pcart.find((item) => item.pId == id);
    // only increase quantity of existing product
    oldProduct.pQuantity = parseInt(oldProduct.pQuantity) + 1;    
    
    /* updating quantity on ui */
     $('.number-of-product').val(oldProduct.pQuantity);
    // checking existing item id
    pcart.map((item) => {
        if (item.pId == oldProduct.pId) {
            item.pQuantity = oldProduct.pQuantity;
        }
    });
    // updating new quantity inti cart
    localStorage.setItem('cart', JSON.stringify(pcart));
    console.log(id+' existing product quantity is increased');  
    ShowingCart();
}

function decrease_Quantity(pid) {
    
    let id = pid;
    let cart = localStorage.getItem('cart');
    let pcart = JSON.parse(cart);
    let oldProduct = pcart.find((item) => item.pId == id);
    // only increase quantity of existing product
    oldProduct.pQuantity = parseInt(oldProduct.pQuantity) - 1;    
    /* updating quantity on ui */
     $('.number-of-product').val(oldProduct.pQuantity);
    // checking existing item id
    pcart.map((item) => {
        if (item.pId == oldProduct.pId) {
            item.pQuantity = oldProduct.pQuantity;
        }
    });
    // updating new quantity inti cart
    localStorage.setItem('cart', JSON.stringify(pcart));
    console.log(id+' = existing product quantity is decrease');  
    ShowingCart();
}

