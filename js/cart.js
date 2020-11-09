//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let items = [];
let shippingPercent = 0;

document.addEventListener("DOMContentLoaded", function (e) {

    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(value => value.json()).then(value => {
        console.log(value)

        items = value.articles;

        update();

    })

    document.getElementById("shippingSelect").addEventListener("click", ev => {
        shippingPercent = ev.target.value;
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

function createNewItem(name = "", id = 0, price = "", currency = "usd", image = "", count = 0) {
    return `
    <div class="col col-auto"><div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    <b>Precio</b> <span id="cart-${id}-price">${price}</span> ${currency}
                    <div class="">
                        <b>Cantidad</b> 
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
                        />
                    </div>
                </p>
            </div>
            <button type="button" onclick="handleDelete(${id})" class="btn btn-danger px-1 py-0 rounded-0">Borrar</button>
          </div>
        </div>
    </div>
    `;
}

function update() {
    let doc = document.getElementById('cart-container');
    doc.innerHTML = "";

    items.forEach((value, index) => {
        let price = value.unitCost;
        let currency = value.currency;
        doc.innerHTML += createNewItem(value.name, index, price, currency, value.src, value.count);
    })

    calcTotal()
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
    let subTotal = 0;

    items.forEach((value, index) => {
        let count = value.count;
        let price = value.unitCost;
        let currency = value.currency;

        if (currency === "UYU") {
            subTotal += (price / 40) * count;
        } else if (currency === "USD") {
            subTotal += price * count;
        }
    })

    document.getElementById("cart-subtotal").innerText = subTotal;

    // Calculating taxes.
    let shippingPrice = subTotal / 100 * shippingPercent;
    document.getElementById("cart-shipping").innerText = shippingPrice;
    document.getElementById("cart-total").innerText = subTotal + shippingPrice;
}


function hideModal() {
    let cc = document.getElementById("cc-number").value;
    let ccExp = document.getElementById("cc-exp").value;
    let cvv = document.getElementById("x_card_code").value;
    let zip = document.getElementById("x_zip").value;

    let bool = (cc === "" || ccExp === "" || cvv === "" || zip === "");

    checkPaymentStatus(cc === "", ccExp === "", cvv === "", zip === "")

    if (bool) return console.log("Please complete all inputs");

    $('#staticBackdrop').modal('hide');
}

function checkPaymentStatus(cc, ccexp, cvv, zip) {
    let invalidCc = document.getElementById("invalid-cc");
    let invalidExp = document.getElementById("invalid-exp");
    let invalidCvv = document.getElementById("invalid-cvv");
    let invalidZip = document.getElementById("invalid-zip");

    if (cc) invalidCc.style.display = "block"
    else invalidCc.style.display = "none"

    if (ccexp) invalidExp.style.display = "block"
    else invalidExp.style.display = "none"

    if (cvv) invalidCvv.style.display = "block"
    else invalidCvv.style.display = "none"

    if (zip) invalidZip.style.display = "block"
    else invalidZip.style.display = "none"
}

function purchase() {
    let cc = document.getElementById("cc-number").value;
    let ccExp = document.getElementById("cc-exp").value;
    let cvv = document.getElementById("x_card_code").value;
    let zip = document.getElementById("x_zip").value;

    let paymentMethod = (cc === "" || ccExp === "" || cvv === "" || zip === "");
    let shipping = shippingPercent > 0;
    let haveItems = items.length > 0;

    console.log(!paymentMethod, shipping, haveItems)
    let alert = document.getElementById("purchaseAlert");


    if (!paymentMethod && shipping && haveItems) {
        alert.classList.remove("d-none")
        alert.classList.remove("alert-danger")
        alert.innerText = "Gracias por comprar!"
        alert.classList.add("alert-success")
    } else {
        alert.classList.remove("d-none")
        alert.classList.remove("alert-success")
        alert.innerText = "Completa todos los campos!"
        alert.classList.add("alert-danger")
    }

    setTimeout(() => {
        alert.classList.add("d-none")
    }, 1000 * 5);

}
