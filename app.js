const btnSearch = document.getElementById('searchButton');
const search = document.getElementById('search');
const main = document.querySelector('main');
const paragraph = document.querySelector('p');


//Fetch Functions ---------------------------------------------------------------------------------------------------------------------
function fetchInfo(url) {
    return fetch(url)
        .then(response => response.json())
}

function fetchJSON(url) {
    return fetch(url)
        .then(response => response.json())
        .then(output => console.log(output[Math.floor(Math.random() * output.length)]))
}

fetchJSON(`recipe.json`);
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
    <div>
        <img src="${data.image.medium}" class="center-block" alt>
        <p class="text-light text-center">${data.name}</p>
        <section class="text-light text-center">${data.summary}</section>
    </div>
    `;
}

function generateRecipe(data) {
    let randomRecipe = data[Math.floor(Math.random() * data.length)];
    let html2 = `
    <div>
        <img src="${randomRecipe.imageURL}" alt>
        <p class="text-light text-center">${randomRecipe.name}</p>
    </div>
    `;
    main.insertAdjacentHTML('beforeend', html2);
}

//Event Listeners ---------------------------------------------------------------------------------------------------------------------
btnSearch.addEventListener('click', () => {
    fetchInfo(`http://api.tvmaze.com/search/shows?q=${search.value}`)
        .then( data => generateList(data) )
});

document.addEventListener('click', e => {
    if(e.target.className === 'select') {
        fetchInfo(`http://api.tvmaze.com/singlesearch/shows?q=${e.target.id}`)
            .then( data => generateInfo(data) )
            .then( () => fetchInfo(`recipe.json`) )
            .then( data => generateRecipe(data) )
     }
 });
