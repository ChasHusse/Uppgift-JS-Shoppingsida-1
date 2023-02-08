# Uppgift JS Shoppingsida 🛒


Denna uppgift prövar färdigheter på att använda arraymetoder, objekt och funktioner i ett sammanhang där du ska utveckla funktionalitet för en shoppingsida. Du ska utgå utifrån befintlig produktdata i startkoden samt spara kundvagnsdata i LocalStorage

Du får endast utveckla sidan med ren JavaScript (d.v.s Vanilla, inget ramverk/bibliotek)


## Startkod

### Data:

Produktdatan finns i data.js soch nås med variabeln shopData. Denna js-är länkad till både index.html och cart.html och ser ut enligt följande:
       
            [
                {
                    id:1,
                    title:'...',
                    price:'...',
                    category:'...',
                    description:'...',
                    image:'...'
                },
                /*...*/
                {
                    id:30,
                    title:'...',
                    price:'...',
                    category:'...',
                    description:'...',
                    image:'...'
                }
            ]


### Filer:

       main.js       Logik för att visa/hantera alla produkter
       cart.js       Logik för visa/hantera kundvagnens produkter 
       style.css     Innehåller styling och korresponderar till html-templates i startkoden. Du är fri att ändra!
       
### LocalStorage

Du sparar och hämtar data i kundvagnen i LocalStorage. Datat i LocalStorage ska endast innehålla produktid:et samt motsvarande valt antal. Du ska alltså kunna hämta 'basket' både från main.js och cart.js. 

       let basket = JSON.parse(localStorage.getItem("data")) || [];
       
### HTML-templates

Du är fri att ändra i html-templates som finns i startkoden, men tänk på att nuvarande uppmärkning korresponderar till style.css

Denna html-template ska generera en produkt i index.html: 

    <div id=product-id-{--id--} class="item">
        <img width="220" src={--url--} alt=""> 
        <div class="details">
            <h3>{--title-}</h3>
            <p>{--desription--}</p>
            <div class="price-quantity">
            <h2>{--price-)-</h2>
            <div class="buttons">
                <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
                <div id={--id--} class="quantity">
                </div>
                <div id={--id--} class="quantity">???</div>
                <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
    </div>

Denna html-template ska generera en produkt från kundvagnen och ska renderas i cart.html: 

     <div id=product-id-{--id--} class="item">
         <img width="220" src={--url--} alt=""> 
         <div class="details">
             <h3>{--title-}</h3>
             <p>{--desription--}</p>
             <div class="price-quantity">
             <h2>{--price-)-</h2>
             <div class="buttons">
                 <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
                 <div id={--id--} class="quantity">
                 </div>
                 <div id={--id--} class="quantity">???</div>
                 <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
             </div>
             </div>
         </div>
     </div>

## Övrigt

Du är fri att ändra i styling, men inget måste i uppgiften!

## Hur det kan se ut

![](https://github.com/chasacademy-sandra-larsson/js--shopping-site/blob/main/screens/produktsida.png)

![](https://github.com/chasacademy-sandra-larsson/js--shopping-site/blob/main/screens/kundvagn.png)
