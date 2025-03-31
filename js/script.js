// impotr data from cart.js 
import { products } from '../data/products.js';
import { cart , addToCart} from '../data/cart.js';
import {calculationMony} from './utils/mony.js';

// render data
function renderProduct(){
    for (let product of products) {
        document.querySelector(".products").innerHTML += `
            <div class="card shrink-0 grow">
                <div class="product-img ">
                    <img src="${product.image}" alt="">
                </div>
                <div class="prooduct-info">
                    <h3 class="">${product.name}</h3>
                    <div class="rating flex gap-3 items-center">
                        <div class="img-stars w-3/5"><img src="images/ratings/rating-${
                        product.rating.stars * 10
                        }.png" alt=""></div>
                        <div class="count text-blue-500">${
                        product.rating.count
                        }</div>
                    </div>
                    <div class="selection">
                        <select name="" class="select-${product.id}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <p>$${calculationMony(product.priceCents)}</p>

                    <div class="relative mt-5">
                        <div class="message-added message-added-${product.id} flex justify-between items-center absolute hidden">
                            <div class="icon-box w-4">
                                <img class="" src="images/icons/checkmark.png" alt="">
                            </div>
                            <span class="added">Added</span>
                        </div>
                        <button class="add-to-cart-btn js-add-to-cart-btn bg-amber-500 rounded-full"
                        data-product-id="${product.id}"
                        data-product-name="${product.name}"
                        data-product-image="${product.image}"
                        data-product-price="${calculationMony(product.priceCents)}"
                        >Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
}
renderProduct();


// cart count 
function cartCount(){
    let quantity = 0;
    for (let quantities of cart){
        quantity += +quantities.quantity;
    }
    
    let cartQuantityNums = document.querySelectorAll('.cart-quantity');
    if (cart != null){
        cartQuantityNums.forEach((container)=>{
            container .innerHTML = quantity
        })
    }
}
cartCount()

// add to cart function
const addToCartBtns = document.querySelectorAll('.js-add-to-cart-btn');

for(let btn of addToCartBtns){
    btn.addEventListener('click',()=>{
        const productId = btn.dataset.productId;
        const productName = btn.dataset.productName;
        const productPrice = btn.dataset.productPrice;
        const productImage = btn.dataset.productImage;
        let quantity = 0;

        const select = document.querySelector(`.select-${productId}`);
        quantity = select.value
        
        addToCart(productId, productName, productPrice, productImage, quantity);
        
        cartCount();
        added(productId);
        centerCartValue()
    })   
}



function added(id){
    let message = document.querySelector(`.message-added-${id}`);

    message.classList.remove('hidden')
    setTimeout( ()=>{
        if(message.classList.contains !== 'hidden'){
            message.classList.add('hidden');
        }
    } ,1500)
    
}


// center the cart quantity in header
function centerCartValue(){
    let quantity = 0;
    for (let product of cart ){
        quantity += +product.quantity;        
    }

    let value = document.querySelector('.logo-cart-quantity');
    if(quantity > 10){
        value.classList.remove('left-1/2');
        value.style.left = "40%";
    }else{
        value.classList.add('left-1/2');
    }
}
centerCartValue()
