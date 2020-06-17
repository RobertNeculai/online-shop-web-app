window.Shop={
    API_URL:"http://localhost:8082",


    getProducts:function () {
        $.ajax({
            url: Shop.API_URL+"/products",
            method:"GET"
        }).done(function (response) {
            console.log(response);
            Shop.displayProducts(response.content);
        })

    },

    addProductToCart:function(customerId,productId){
        //TODO: read customerId dynamically in the future
      let request={
          customerId:customerId,
          productsIds:[productId]
      };
      $.ajax({
          url:Shop.API_URL + "/carts",
          method:"PUT",
          contentType: "application/json",
          data: JSON.stringify(request)
      }).done(function () {
          location.replace("cart.html")
          })
    },
    displayProducts:function (products) {
        let productsHtml = '';
        products.forEach(product => productsHtml += Shop.getHtmlForOneProduct(product));

        $('.single-product-area .row:first-child').html(productsHtml);
    },
    displayPhotoforProduct: function (product) {
        return`<img src=${product.imageURL} alt="" class="single-shop-product"/>`
    },
    getHtmlForOneProduct:function(product){
        return ` <div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                        </div>
                        <h1><a href="">${Shop.displayPhotoforProduct(product)}</a>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.salesPrice}</ins> <del></del>
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id=${product.id} rel="nofollow" href="#">Add to cart</a>
                        </div>                       
                    </div>
                </div>`;
    },
    bindEvents:function (){
        $('.single-product-area').delegate('.add_to_cart_button','click',function (event) {
            event.preventDefault();
            let userId=$(this).data('user_id')
            let productId = $(this).data('product_id');
            Shop.addProductToCart(userId,productId);
        })
    }
};
Shop.getProducts();
Shop.bindEvents();