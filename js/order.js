import {cart} from '../data/cart.js';
import { calculationMony } from './utils/mony.js';

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
cartCount();

// get date
function getTodayDate() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // الأشهر تبدأ من 0 لذا نضيف 1
    let year = today.getFullYear();
    
    // تنسيق اليوم والشهر ليكونا بصيغة 01 بدلاً من 1
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    
    return `${day}/${month}/${year}`;

}
document.querySelector('.date').innerHTML = getTodayDate();

// oreder id
function generateInvoiceID() {
    let timestamp = Date.now().toString(36); // تحويل الطابع الزمني إلى نظام عددي أساس 36
    let randomStr = Math.random().toString(36).substr(2, 10); // توليد جزء عشوائي أطول
    let uniquePart = crypto.randomUUID().replace(/-/g, '').substr(0, 8); // جزء فريد من UUID
    
    return `INV-${timestamp}-${randomStr}-${uniquePart}`.toUpperCase();
}

document.querySelector('.oreder-id').innerHTML = generateInvoiceID();

// console.log(generateInvoiceID()); // مثال على ID الفاتورة


// get header total
function getTotal(){
    let total = 0;
    for(let price of cart){
        total += +price.productPrice
    }
    document.querySelector('.total').innerHTML =`$${calculationMony(total)}`
}
getTotal();
// render products order

function renderOreders(){
    let container = document.querySelector('.order-body');

    
    for(let product of cart){
        container.innerHTML += `
            <!-- order card  -->
            <div class="order-card flex gap-5">
                <div class="img">
                    <img src="${product.productImage}" alt="">
                </div>
                <div class="info">
                    <h3>${product.productName}</h3>
                    <p>Arriving on: April 8</p>
                    <p>Quantity: <span>${product.quantity}</span></p>
                    <div class="btns">
                        <button class="flex justify-between bg-amber-500 hover:cursor-pointer">
                            <img class="" src="images/icons/buy-again.png" alt="">
                            Buy it again
                        </button>
                        <button class="hover:cursor-pointer track-pakage">
                            Track package
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}
renderOreders();
