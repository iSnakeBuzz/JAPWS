//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    const data = {
        username: "",
        password: "",
    };

    let userInput = document.getElementById('userInput');
    let passInput = document.getElementById('passInput');
    let send = document.getElementById('send');

    userInput.addEventListener('change', (e) => {
        console.log(e)
        data.username = e.target.value;
    });

    passInput.addEventListener('change', (e) => {
        console.log(e)
        data.password = e.target.value;
    })

    send.addEventListener('click', (e) => {
        let alert = document.getElementById('alert');
        alert.classList.remove("bg-success")
        alert.classList.remove("bg-danger")


        if (data.username.length > 0 && data.password.length > 0) {
            alert.classList.add("bg-success")
            alert.classList.remove("d-none")
            alert.innerText = "Has ingresado con exito! Redirigiendo...";

            localStorage.setItem("logged", data.username);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000 * 3)
        } else {
            alert.classList.add("bg-danger")
            alert.classList.remove("d-none")
            alert.innerText = "Por favor introduce contenido en todos los campos para poder continuar!";
        }

    })

});
