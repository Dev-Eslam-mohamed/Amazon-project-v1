import { cart, removeFromCart, saveToLocalStorage } from "../data/cart.js";
import { calculationMony } from "./utils/mony.js";

// cart-quantity of header

function cartCount() {
  let quantity = 0;
  for (let quantities of cart) {
    quantity += +quantities.quantity;
  }

  if (cart != null) {
    document.querySelector(".cart-quantity").innerHTML = quantity;
  }
}
cartCount();

// render summary
function renderSummary() {
  let total = 0;
  cart.forEach((item) => {
    total += +item.productPrice * item.quantity;
  });
  let shipping = 0;
  let TotalBeforeTaxes = total + shipping;
  let estimatedTax = total * 0.1;
  let totalPrice = TotalBeforeTaxes + estimatedTax;
  let summary = document.querySelector(".summary");

  summary.innerHTML = `
        <div>
            <h2 class="font-bold text-lg mb-3">Order Summary</h2>
        </div>
        <div>
            <div class="items flex justify-between items-center">
                <p>items (<span class="cart-quantity">${
                  cart.length
                }</span>):</p> 
                <p>$${calculationMony(total * 100)}</p>
            </div>
        </div>
        <div>
            <div class="items flex justify-between items-center mb-3">
                <p>Shipping & handling:</p> 
                <p class="border-b border-b-gray-200">$0.00</p>
            </div>
        </div>
        <div>
            <div class="items flex justify-between items-center">
                <p>Total before tax:</p> 
                <p>$${calculationMony(TotalBeforeTaxes * 100)}</p>
            </div>
        </div>
        <div>
            <div class="items flex justify-between items-center">
                <p>Estimated tax (10%):</p> 
                <p>$${calculationMony(estimatedTax * 100)}</p>
            </div>
        </div>
        <hr class="bg-gray-300 my-3">
        <div class="font-bold text-lg">
            <div class="items flex justify-between items-center text-red-800">
                <p>Order total:</p> 
                <p>$${calculationMony(totalPrice * 100)}</p>
            </div>
        </div>
        <div>
            <a href="./order.html">
                <button class="order-btn rounded-full bg-amber-500 w-full p-1 mt-3 ">
                    Place your order
                </button>
            </a>
        </div>
    `;
}
renderSummary();

//render cart products
let cartItems = document.querySelector(".checkout-items");
function renderCartProducts() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    cartItems.innerHTML += `
            <section class=" mt-3 mb-3 p-3 md:flex gap-5 cart-items cart-items-${item.productId}">
                <div class="top-section">
                    <div class="section-header mb-5 text-green-700 font-bold text-xl">
                        Delivery date: Tuesday, April 8
                    </div>
                    <div class="product-info flex gap-3">
                        <div class="product-img">
                            <img src="${item.productImage}" alt="">
                        </div>
                        <div class="details">
                            <p>${item.productName}</p>
                            <span>$${item.productPrice}</span>
                            <div class="flex gap-1">
                                <p class="quantity">Quantity: 
                                    <span class="item-quantity item-quantity-${item.productId}">${item.quantity}</span>
                                    <input type="number" class="input-quantity input-quantity-${item.productId} hidden">
                                </p>
                                <a data-product-id = "${item.productId}"
                                data-quantity = "${item.quantity}"
                                class="update-btn hover:cursor-pointer"
                                >Update</a>

                                <a data-product-id = "${item.productId}" data-quantity = "${item.quantity}"
                                class="save-btn save-btn-${item.productId} hidden hover:cursor-pointer"
                                >Save</a>


                                <a data-product-id="${item.productId}"
                                class="remove-btn hover:cursor-pointer">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="botom-section mt-5">
                    <div class="flex gap-3 items-center">
                        <input type="radio" name="" id="">
                        <div>
                            <h3 class="header text-green-700 font-bold">Tuesday, April 8</h3>
                            <p class="text-gray-400">FREE Shipping</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-center"><input type="radio" name="" id="">
                        <div>
                            <h3 class="header text-green-700 font-bold">Wednesday, April 2</h3>
                            <p class="text-gray-400">$4.99 - Shipping</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-center"><input type="radio" name="" id="">
                        <div>
                            <h3 class="header text-green-700 font-bold">Monday, March 31</h3>
                            <p class="text-gray-400">$9.99 - Shipping</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
  });
}
renderCartProducts();

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = `
            <div class="emty-cart-message ">
                <h3 class="text-xl font-bold">Your cart is empty.</h3>
                <a href="./index.html">
                    <button class="view-products-btn bg-amber-500 rounded">
                        View products 
                    </button>
                </a>
            </div>
        `;
  }
}
renderCart();

// remove items;
let deleteBtns = document.querySelectorAll(".remove-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const productId = btn.dataset.productId;
    let container = document.querySelector(`.cart-items-${productId}`);
    removeFromCart(productId);
    container.remove();
    renderSummary();
    cartCount();
    renderCart();
  });
});

// hidden and display save and update btns
const updateBtns = document.querySelectorAll(".update-btn");

updateBtns.forEach((btn) => {
  const productId = btn.dataset.productId;
  let itemQuantity = btn.dataset.quantity;
  const saveBtn = document.querySelector(`.save-btn-${productId}`);

  // hidden the update btn
  btn.addEventListener("click", () => {
    btn.classList.add("hidden");
  });
  // appeare the save btn
  btn.addEventListener("click", () => {
    saveBtn.classList.remove("hidden");
  });

  // display input field;
  btn.addEventListener("click", () => {
    const quantityContainer = document.querySelector(
      `.item-quantity-${productId}`
    );
    const inputField = document.querySelector(`.input-quantity-${productId}`);

    quantityContainer.classList.add("hidden");
    inputField.classList.remove("hidden");
  });
});

const saveBtns = document.querySelectorAll(".save-btn");
saveBtns.forEach((btn) => {
  const productId = btn.dataset.productId;
  let itemQuantity = btn.dataset.quantity;
  const inputField = document.querySelector(`.input-quantity-${productId}`);
  const quantityContainer = document.querySelector(
    `.item-quantity-${productId}`
  );

  // hidden the save btn
  btn.addEventListener("click", () => {
    btn.classList.add("hidden");
  });

  // appeare the update btn
  btn.addEventListener("click", () => {
    updateBtns.forEach((updteBtn) => {
      updteBtn.classList.remove("hidden");
    });
  });

  //
  btn.addEventListener("click", () => {
    itemQuantity = inputField.value;
    quantityContainer.innerHTML = itemQuantity;
    quantityContainer.classList.remove("hidden");
    inputField.classList.add("hidden");

    let newQuantityOfCart = cart.find((obj) => {
      return obj.productId === productId;
    });

    newQuantityOfCart.quantity = itemQuantity;
    cartCount();
    saveToLocalStorage();
    renderSummary();
  });
});
