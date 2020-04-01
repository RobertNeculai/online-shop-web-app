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
    displayProducts:function (products) {
        let productsHtml = '';
        products.forEach(product => productsHtml += Shop.getHtmlForOneProduct(product));

        $('.single-product-area .row:first-child').html(productsHtml);
    },
    getHtmlForOneProduct:function(product){
        return ` <div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins> <del></del>
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id=${product.id} rel="nofollow" href="#">Add to cart</a>
                        </div>                       
                    </div>
                </div>`;
    }


};
Shop.getProducts();