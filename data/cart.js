export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

// add to cart function
export function addToCart(productId, productName, productPrice, productImage, quantity) {
    let matchingItem;
    cart.forEach( item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity++;
    }else {
        cart.push({
            productId,
            productName,
            productPrice,
            productImage,
            quantity
        });
    }

    saveToLocalStorage();
}



// remove item from cart 
export function removeFromCart(productId){
    let newCart = [] ;
    cart.forEach(item => {
        if (item.productId!== productId) {
            newCart.push(item);
        }
    });

    cart = newCart;
    saveToLocalStorage();
}