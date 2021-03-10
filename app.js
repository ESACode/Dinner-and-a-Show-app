const btnSearch = document.getElementById('searchButton');
const search = document.getElementById('search');
const main = document.querySelector('main');
const paragraph = document.querySelector('p');

//Fetch Functions ---------------------------------------------------------------------------------------------------------------------
function fetchList(url) {
    return fetch(url)
        .then(response => response.json())
}

function fetchRecipe(url) {
    return fetch(url)
        .then(response => response.json())
}

//Helper Function ---------------------------------------------------------------------------------------------------------------------

function generateList(data) {
    let html1 = '';
    data.filter(element => element.show.image !== null) //filter out shows that have no image to display
        .forEach(element => {
        html1 += `
        <img src="${element.show.image.medium}" alt>
        <button id="${element.show.name}" class="select">Get More Info and a Recipe</button>
    `;
    })
    main.innerHTML = html1;
    paragraph.innerText = "Select a show below!";
}

function generateInfo(data) {
    paragraph.innerText = "";
    main.innerHTML = `
    <img src="${data.image.medium}" class="center-block" alt>
    <p class="text-light text-center">${data.name}</p>
    <section class="text-light text-center">${data.summary}</section>
    `;
}

//Event Listeners ---------------------------------------------------------------------------------------------------------------------
btnSearch.addEventListener('click', () => {
    fetchList(`http://api.tvmaze.com/search/shows?q=${search.value}`)
        .then(data => generateList(data))
});

document.addEventListener('click', e => {
    if(e.target.className === 'select') {
        fetchList(`http://api.tvmaze.com/singlesearch/shows?q=${e.target.id}`)
            .then(data => generateInfo(data))
     }
 });
