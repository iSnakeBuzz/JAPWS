//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let items = [];

document.addEventListener("DOMContentLoaded", function (e) {

    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(value => value.json()).then(value => {
        console.log(value)

        items = value.articles;

        update();

    })

});

function createItem(name = "", id = 0, price = "", currency = "usd", image = "", count = 0) {
    return `
        <div class="col col-auto w-100 mt-3">
            <div class="row justify-content-start align-content-center h-100">
                <div class="col col-auto">
                    <img src="${image}" width="170px">
                </div>
                <div class="col col-auto">
            
                    <div class="h2">${name}</div>
                    <div class="h5"><b>Precio</b> <span id="cart-${id}-price">${price}</span> ${currency}</div>
                    <div class="h5"><b>Cantidad</b> 
                        <input 
                            id="cart-${id}-input"
                            type="number" 
                            aria-label="Cantidad" 
                            value="${count}" 
                            min="0" 
                            max="100" 
                            onchange="cartChange(${id})" 
                            class="form-control" 
                            style="width: 80px; display: inline;"
                            >
                    </div>
            
                    <button type="button" onclick="handleDelete(${id})" class="btn btn-danger px-1 py-0">Borrar</button>
                </div>
            </div>
        </div>
    `;
}

function update() {
    let doc = document.getElementById('cart-container');
    doc.innerHTML = "";

    let totalPrice = 0;

    items.forEach((value, index) => {
        let count = value.count;
        let price = value.unitCost;
        let currency = value.currency;

        if (currency === "UYU") {
            totalPrice += (price / 40) * count;
        } else if (currency === "USD") {
            totalPrice += price * count;
        }

        doc.innerHTML += createItem(value.name, index, price, currency, value.src, value.count);
    })

    document.getElementById("cart-total").innerText = totalPrice;
}

function cartChange(id) {
    let item = items[id];
    let count = document.getElementById(`cart-${id}-input`).value;
    item.count = count;
    items[id] = item;

    calcTotal()
}

function handleDelete(id) {
    console.log("Deleting:", id)
    items.splice(id, 1);
    update();
    calcTotal()
}

function calcTotal() {
    let totalPrice = 0;

    items.forEach((value, index) => {
        let count = value.count;
        let price = value.unitCost;
        let currency = value.currency;

        if (currency === "UYU") {
            totalPrice += (price / 40) * count;
        } else if (currency === "USD") {
            totalPrice += price * count;
        }
    })

    document.getElementById("cart-total").innerText = totalPrice;
}
