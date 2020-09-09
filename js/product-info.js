let comments = [];
let localScore = 0;

document.addEventListener("DOMContentLoaded", function (e) {


    fetch(PRODUCT_INFO_URL).then(res => res.json()).then(data => {

        console.log(data)
        loadContent(data)

        document.getElementById('sendComment').addEventListener('click', ev => {
            let user = localStorage.getItem('logged');
            let description = document.getElementById('comment').value;

            let dateFormat = new simpleDateFormat();
            dateFormat.applyPattern('y-MM-dd hh:mm')

            let rawDate = new Date();

            let date = dateFormat.format(rawDate)

            let toSend = {
                user,
                description,
                score: localScore,
                dateTime: date
            }

            comments.push(toSend);
            updateComments(comments);
        });

    });

});


function changeScore(score) {
    localScore = score;
}

/**
 * Load main content
 *
 * @param data Json data
 */
function loadContent(data = {}) {

    // Title
    let title = document.getElementById('product-title');
    title.innerText = data.name;

    // Description
    let desc = document.getElementById('product-desc');
    desc.innerText = data.description;

    // Sold count
    let soldCount = document.getElementById('product-sold');
    soldCount.innerText = data.soldCount;

    // Images
    let imageContainer = document.getElementById('imagesContainer');
    imageContainer.innerText = "";
    for (let i = 0; i < data.images.length; i++) {
        imageContainer.innerHTML += parseImage(data.images[i]);
    }

    // Comments
    let commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerText = "Loading Comments..";

    fetch(PRODUCT_INFO_COMMENTS_URL).then(res => res.json()).then(res => {
        comments = res;
        updateComments(comments);
    })

}

/**
 * Update comments
 *
 * @param comments Array of comments
 */
function updateComments(comments = []) {
    let commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerText = "";
    commentsContainer.innerHTML = comments.map(value => {
        return parseComment(value);
    })
}


/**
 * Parse source to HTML
 *
 * @param imageSrc the source of the Image
 */
function parseImage(imageSrc) {
    return `
        <div class="col-lg-3 col-md-4 col-6">
            <a href="#" class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${imageSrc}" alt="">
            </a>
        </div>
    `;
}

/**
 * Parse json comment to HTML Comment
 *
 * @param comment The comment inside a json
 */
function parseComment(comment = {}) {

    return `
        <div class="card w-100 py-2 px-3 mt-3">
        
            <div class="form-inline">
                <div class="font-weight-bold">${comment.user}</div>
                <div class="ml-2 my-auto text-black-50">${parseScore(comment.score)}</div>
            </div>
        
            <div class="my-2">
            ${comment.description}
            </div>
            <small>${comment.dateTime}</small>
        </div>
    `;

}

function parseScore(score) {
    let toSend = "";
    let unchecked = 5 - score;

    for (let i = 0; i < score; i++) {
        toSend += `
            <span class="checked">★</span>
        `;
    }

    if (unchecked !== 0) {
        for (let i = 0; i < unchecked; i++) {
            toSend += `
                <span class="">★</span>
            `;
        }
    }

    return toSend;
}
