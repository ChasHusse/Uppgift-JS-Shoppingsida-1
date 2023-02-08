const shop = document.getElementById('shop');
 
let basket = JSON.parse(localStorage.getItem("basketData")) || [];
let basketAmount = document.querySelector("#cartAmount")

let categorieList = document.getElementById("categories")
let categories
let products = []

//Show the catogeries in the categori nav-bar
let categorieNav = () => {
    categories = shopData.map(element => element.category)

    categories = categories.filter((element, index) => {
    return categories.indexOf(element) === index; 
    })

    for(let i = 0; i < categories.length; i++){
        categorieList.innerHTML += ` <li class="categorie"><a href="#">${categories[i]}</a></li>`
    }

    categorieList.innerHTML += ` <li class="categorie"><a href="#">All Catogeries</a></li>`
}
categorieNav()

categories = document.querySelectorAll(".categorie")

categories.forEach(element => {
    element.addEventListener("click", () => {
        return generateShop(element.innerText)
    })    
});

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
}

//Update basket amount. 
let updateBasketAmount = () => {
    basketAmount.innerHTML = basket.map(element => element.quantity)

    basketAmount.innerHTML = basket.reduce((accumlator, currentValue) => {
        return accumlator + currentValue.quantity
    }, 0)

    localStorage.setItem("basketData", JSON.stringify(basket))
}

//Show the products in the shop
let generateShop = (choosenCategory) => {

    if(choosenCategory != undefined && choosenCategory != "All Catogeries"){
        choosenCategory = choosenCategory.toLowerCase()
    }

    products = []
    
    for(let i = 0; i < shopData.length; i++){
        if(choosenCategory == shopData[i].category){
            products.push(shopData[i])
        }else if (choosenCategory == undefined || choosenCategory == "All Catogeries"){
            products.push(shopData[i])
        }
    }

     shop.innerHTML = products.map((product) => {
        return  `
                    <div id=product-id-${product.id} class="item">
                        <img width="220" src=${product.image} alt=""> 
                        <div class="details">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <div class="price-quantity">
                                <h2>${product.price}</h2>
                                <div class="buttons">
                                    <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
                                    <div id=${product.id} class="quantity">0</div>
                                    <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    }).join("")

    for(let i = 0; i < products.length; i++){
        increment(products[i].id)
        decrement(products[i].id)
    }
};
generateShop()
