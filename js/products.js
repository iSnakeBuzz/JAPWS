//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let products = [];
let backup = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(resp => {
        products = resp.data;
        backup = resp.data;
        update();
    })


    document.getElementById('sortAsc').addEventListener('click', ev => {
        sort(products, "AZ");
        update()
    });
    document.getElementById('sortDesc').addEventListener('click', ev => {
        sort(products, "ZA");
        update()
    });
    document.getElementById('sortByPrice').addEventListener('click', ev => {
        sort(products, "PRICE");
        update()
    });


    document.getElementById('clearRangeFilter').addEventListener('click', ev => {
        reset()
    });
    document.getElementById('rangeFilterCount').addEventListener('click', ev => {

        let min = document.getElementById('rangeFilterCountMin').value;
        let max = document.getElementById('rangeFilterCountMax').value;

        if (!min && !max) {
            return;
        }

        filter(min, max)
        update()
    });

    document.getElementById('search').addEventListener('input', ev => {
        let value = ev.target.value;

        if (value.length <= 0) {
            return reset();
        }

        filterBySearch(ev.target.value)
        update()
    });

});

function filter(min, max) {
    products = products.filter(value => {
        return value.cost >= min && value.cost <= max;
    })
}

function filterBySearch(name = "") {
    products = backup.filter(value => {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    })
}

function reset() {
    products = backup;
    update()
}

function sort(array = [], type = "AZ") {
    products = array.sort((a, b) => {
        switch (type) {
            case "AZ":
                return a.name.localeCompare(b.name)
            case "ZA":
                return b.name.localeCompare(a.name)
            case "PRICE":
                return a.cost - b.cost;
        }
    });
}

function update() {
    let doc = document.getElementById('products-list');
    doc.innerHTML = "";
    products.forEach(data => {
        // console.log(data)
        doc.innerHTML += template(data.name, data.description, data.imgSrc, data.currency + " " + data.cost);
    })
}

function template(name, desc, img, price) {
    return (`
        <div class="col col-auto">
            <div class="card" style="width: 20rem; ">
                <img src=${img} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${name}<label class="float-right" style="font-size: 14px">${price}</label></h5>
                        <p class="card-text">
                        ${desc}
                        </p>
                        <a href="product-info.html" class="btn btn-primary">Ver producto</a>
                    </div>
            </div>
        </div>
    `);
}
