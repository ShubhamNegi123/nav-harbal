function addToWishlist(pId, pName, pPrice, pQuantity, pPhoto) {
    let Wishlist = localStorage.getItem('Wishlist');
    if (Wishlist == null || Wishlist == '' || Wishlist.length <= 2) {
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

ShowingWishlist();
/* showing wishlist */
function ShowingWishlist() {
    let wishlistString = localStorage.getItem('Wishlist');
    let wishlist = JSON.parse(wishlistString);
    // if cart is empty
    if (wishlist == null || wishlist.length == 0 || wishlist == undefined) {
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
                    <p class="remove-from-wishlist" onclick="remove_Item_From_Wishlist('${item.pId}')">Remove from wishlist</p>
                    <br>
                    <a href="checkout.html" class="order-now-button">Order now</a>
                </div>
            </div>
    `;
        });
        ourWishlist = ourWishlist + `</div>`;
        $('.wishlist').html(ourWishlist);

    }
}


/* remove from wishlist */
function remove_Item_From_Wishlist(Wishlist_id) {


    $('.message').text('Item remove from wishlist ');
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


    
    let id = Wishlist_id;
    let Wishlist = JSON.parse(localStorage.getItem('Wishlist'));
    let newUpdatedWishlist = Wishlist.filter((item) => item.pId != id);
    let NoWishlist = localStorage.setItem('Wishlist', JSON.stringify(newUpdatedWishlist));
    console.log(id + '=single Wishlist is removed');
    ShowingWishlist();
}