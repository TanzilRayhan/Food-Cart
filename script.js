let foodListHtml = document.querySelector('.food-container')
let cartIconSpan = document.querySelector('.cart-icon')
let cartListHtml = document.querySelector('.items')
let quantity = document.querySelector('.quantity')
const total = document.querySelector('.total')

let foodLists = [];
let cartLists = [];


const itemsData = () => {
    fetch('./foods.json')
        .then(res => res.json())
        .then(data => {
            foodLists = data;
            showItems();
            console.log(foodLists);
        })
}
itemsData();

const showItems = () => {
    foodListHtml.innerHTML = '';
    if (foodLists.length > 0) {
        foodLists.forEach((item, key) => {
            let newItem = document.createElement('div');
            newItem.classList.add('food-card');
            newItem.innerHTML = `
            <div class="h-72 border-purple-300 border-2 shadow-md rounded-lg bg-slate-100 hover:bg-sky-100 p-4 flex flex-col justify-center items-center">
            <img class=" h-1/2 drop-shadow-lg" src="${item.image}">
            <h2 class="text-center pt-2 text-xl font-bold">${item.title}</h2>
            <h2 class="text-center py-2 text-base font-semibold">Price: $${item.price}</h2>
            <button class="addCart w-full text-white bg-purple-600 hover:bg-slate-700 text-base font-medium p-2 rounded-lg" onclick="addToCart(${key})">Add To Cart</button>
            </div>
            `;

            foodListHtml.appendChild(newItem);
        })
    }
}


const addToCart = (key) => {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(foodLists[key]));
        cartLists[key].quantity = 1
    }
    cartItems();
}


const cartItems = () => {
    cartListHtml.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    cartLists.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('items');
            newDiv.innerHTML = `
                <div
                    class="my-2 border-white border-2 rounded-lg p-2 font-semibold flex items-center justify-evenly gap-2">
                    <img class="image  h-10" src="${value.image}">
                    <div class="">
                        <h2 class="name font-bold">${value.title}</h2>
                        <h2 class="price text-sm">$${value.price}</h2>
                    </div>

                    <div  class="quantity flex gap-3">
                        <button onclick ="changeQuantity(${key}, ${value.quantity - 1})" class="minus flex items-center justify-center bg-black w-6 h-6 p-1 rounded-xl">
                            - </button>
                                <div class="count">${value.quantity}</div>
                                <button  onclick ="changeQuantity(${key}, ${value.quantity + 1})" class="plus flex items-center justify-center bg-black w-6 h-6 p-1 rounded-xl"> +
                                </button>
                    </div>
                    <button onclick="deleteItem(${key})"><svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 18 20">
                            <path
                                d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                        </svg></button>

                </div>
                `
            cartListHtml.appendChild(newDiv);
        }
        total.innerText = '$' + totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}

const deleteItem = (key) => {
    cartLists.splice(key, 1);
    cartItems();
}

const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        cartLists.splice(key, 1);
        cartItems();
    }
    else {
        cartLists[key].quantity = quantity;
        cartLists[key].price = quantity * foodLists[key].price;
    }
    cartItems();
}