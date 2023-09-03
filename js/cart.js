let shoppingCart = document.getElementById("shopping-cart")
let label = document.querySelector(".label")

let basketAmount = document.querySelector("#cartAmount")
let totalAmount

let basket = JSON.parse(localStorage.getItem("basketData")) || []

let clearCartBtn 
let checkOutBtn


//Update basket
let updateBasketAmount = () => {
    basketAmount.innerHTML = basket.map(element => element.quantity)

    basketAmount.innerHTML = basket.reduce((accumlator, currentValue) => {
        return accumlator + currentValue.quantity
    }, 0)

    localStorage.setItem("basketData", JSON.stringify(basket))
}

//Icrement product quantity.
let increment = (id) => {
    let selectedProduct = id
    let searchProduct = basket.find(element => element.product.id === selectedProduct)

    if(searchProduct == undefined){
        basket.push({product: shopData.find(element => element.id === selectedProduct), quantity: 1})
        document.getElementById(selectedProduct).innerHTML = 1

    } else {
        searchProduct.quantity += 1
        document.getElementById(selectedProduct).innerHTML = searchProduct.quantity
    }

    updateBasketAmount()
    generateCartItems()
}

//Decrement product quantity.
let decrement = (id) => {
    let selectedProduct = id
    let searchProduct = basket.find(element => element.product.id === selectedProduct)

    if( searchProduct == undefined){
        return 
    }

    if(searchProduct.quantity > 1){
        searchProduct.quantity -= 1
        document.getElementById(selectedProduct).innerHTML = searchProduct.quantity
    } else if(searchProduct.quantity == 1){
        basket = basket.filter(element => element !== searchProduct)
        document.getElementById(selectedProduct).innerHTML = 0
    }

    updateBasketAmount()
    generateCartItems()
}

//Remove item
let removeItem = (id) => {
    let selectedProduct = id
    let searchProduct = basket.find(element => element.product.id === selectedProduct)

    basket = basket.filter(element => element != searchProduct)

    updateBasketAmount()
    generateCartItems()

}

//Clear cart
let clearCart = () => {
    basket = []
    localStorage.clear()
    updateBasketAmount()
    generateCartItems()


}

//Check out
let checkOut = () => {
    label.innerHTML = 
    `   <h2>Your purchase has been successful</h2>
        <h3> Thank you for your your purchased of ${basketAmount.innerHTML} products for the total cost of $${Math.round(totalAmount)}.</h3>

    `
    basket = []
    updateBasketAmount()
    shoppingCart.innerHTML = ""

    //Custom Event Tracking - Button Click
    gtag('event', 'button_click', {
        'event_category': 'interaction in cart',
        'event_label': 'check-out from cart',
        'value': 1
    });
    


}


const generateCartItems = () => {
    updateBasketAmount()

    //If cart is not empty
    if(basket.length != 0){
        shoppingCart.innerHTML = basket.map(element => 
            `
                <div class="cart-item">
                    <img width="100" src=${element.product.image} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${element.product.title}</p>
                                <p class="cart-item-price"> ${element.product.price}</p>
                            </h4>
                            <i onclick="removeItem(${element.product.id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="cart-buttons">
                            <div class="buttons">
                                <i onclick="decrement(${element.product.id})" class="bi bi-dash-lg"></i>
                                <div id=${element.product.id} class="quantity">${element.quantity}</div>
                                <i onclick="increment(${element.product.id})" class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                        <h3>${element.quantity * element.product.price}</h3>
                    </div>
                </div>
            `
        )
        
        //Total price amount
        totalAmount = []
        totalAmount = basket.map((element) => {
            return element.product.price * element.quantity
        })
        totalAmount = totalAmount.reduce((accumlator, currentValue) => {
            return accumlator + currentValue
        }, 0)

        label.innerHTML = 
        `
            <h2>The total amount is: $${Math.round(totalAmount)}</h2>
            <button class="cart-page-btn" id="check-out-btn">Check out</button>
            <button class="cart-page-btn" id="clear-cart-btn">Clear cart</button>
        `

        //Clear cart and check out buttons
        clearCartBtn = document.getElementById("clear-cart-btn")
        clearCartBtn.addEventListener("click", clearCart)

        checkOutBtn = document.getElementById("check-out-btn")
        checkOutBtn.addEventListener("click", checkOut)

        

        //If cart is empty
    }else{
        shoppingCart.innerHTML = ""
        label.innerHTML = 
        `
            <h2>Your cart is empty!</h2>
            <p>Go back to home page and do some shopping!</p> 
            <a href="index.html"><button id="home-page-btn">HOME PAGE<button></a>
        `
    } 
}
generateCartItems();











