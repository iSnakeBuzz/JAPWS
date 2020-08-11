//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(resp => {
        console.log(resp)
        let doc = document.getElementById('products-list');

        resp.data.forEach(data => {
            console.log(data)
            doc.innerHTML += template(data.name, data.description, data.imgSrc, data.currency + " " + data.cost);
        })
    })
});

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
                        <!--<a href="#" class="btn btn-primary">Ver producto</a>-->
                    </div>
            </div>
        </div>
    `);
}
