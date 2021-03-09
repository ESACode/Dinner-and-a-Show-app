const btnSearch = document.getElementById('searchButton');
const search = document.getElementById('search');
const main = document.querySelector('main');
const paragraph = document.querySelector('p');
const section = document.querySelector('section');
const theParent = document.querySelector('#theParent');

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
    main.innerHTML = '';
    paragraph.innerText = "Select a show below!";
    section.innerHTML = html1;
}

function generateInfo(data) {
    paragraph.innerText = "";
    section.innerHTML = '';
    main.innerHTML = `
    <img src="${data.image.medium}" alt>
    <p class="text-light">${data.name}</p>
    <p class="text-light">${data.summary}</p>
    `;
}

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        let clickedItem = e.target.id;
        fetchList(`http://api.tvmaze.com/singlesearch/shows?q=${clickedItem}`)
            .then(data => generateInfo(data))
    }
    e.stopPropagation();
}

//Event Listeners ---------------------------------------------------------------------------------------------------------------------
btnSearch.addEventListener('click', () => {
    fetchList(`http://api.tvmaze.com/search/shows?q=${search.value}`)
        .then(data => generateList(data))
});

theParent.addEventListener("click", doSomething, false);
