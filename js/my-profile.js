//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let dataFromStorage = {
    name: undefined,
    last_name: undefined,
    email: undefined,
    phone: undefined,
    image: undefined
};
let name = document.getElementById('name')
let last_name = document.getElementById('last_name')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let image = document.getElementById('profilePicImage')


document.addEventListener("DOMContentLoaded", function (e) {

    let item = localStorage.getItem("profile");

    if (item) {
        dataFromStorage = JSON.parse(item);
    }

    update();
});


function update() {
    if (!dataFromStorage) return;

    if (dataFromStorage.name) name.value = dataFromStorage.name;
    if (dataFromStorage.last_name) last_name.value = dataFromStorage.last_name;
    if (dataFromStorage.email) email.value = dataFromStorage.email;
    if (dataFromStorage.phone) phone.value = dataFromStorage.phone;
    if (dataFromStorage.image) image.src = dataFromStorage.image;

}

function save() {
    if (name.value) dataFromStorage.name = name.value;
    if (last_name.value) dataFromStorage.last_name = last_name.value;
    if (email.value) dataFromStorage.email = email.value;
    if (phone.value) dataFromStorage.phone = phone.value;

    localStorage.setItem("profile", JSON.stringify(dataFromStorage));
}


$(document).ready(function () {
    $("#profile-pic").change(function () {
        handleUpload(this);
    });
});

function handleUpload(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            $('#profilePicImage').attr('src', e.target.result).fadeIn('slow');
            dataFromStorage.image = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
