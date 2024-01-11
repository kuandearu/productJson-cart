(function fetchData(){
    return fetch("products.json")
    .then(response => response.json())
    .then(data =>{
        data.products.forEach(product =>{
        const productContainer = document.getElementById("products");
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = (
            `<img src="${product.imageUrl}" alt="" style="width:200px;height:200px;">
            <h3>${product.productName}</h3>
            <p>Price: ${product.productPrice} VND</p>
            <p>id: ${product.productId}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.productId}, '${product.productName}', ${product.productPrice})">Add to Cart</button>`
            );
        productContainer.appendChild(productElement);
        });        
    })
})();
    const cartContaniner = document.getElementById("cart");
    const totalAmountContainer = document.getElementById("totalAmount")
    const cart = [];
function addToCart(productId, productName, productPrice){
    const productInCart = cart.find(item => item.productId === productId)
    if(productInCart){
        productInCart.quantity++;
    }
    else{
        cart.push({
            productId,productName,productPrice,quantity : 1
        });       
    }
    displayCart();
}
function displayCart(){
    cartContaniner.innerHTML = `<h5>Cart:</h5>`// this is to clear the cartContainer to avoid repeat the whole line of cartItem instead of updating only
    let overAllPrice = 0;
    cart.forEach(item =>{
        const cartItem = document.createElement("p");
        const itemTotal = item.quantity * item.productPrice;
        overAllPrice += itemTotal;

        cartItem.textContent = (`${item.productName}: Quantity - ${item.quantity} - Total: ${itemTotal} VND`);
        cartContaniner.appendChild(cartItem);
        
    });
    totalAmountContainer.innerHTML = (`<p>Amount: </p>`);
    totalAmountContainer.innerHTML += (`<p>Total - ${overAllPrice} VND</p>`);
}

