const btnSearch = document.getElementById('searchButton');
const search = document.getElementById('search');
const main = document.querySelector('main');
const paragraph = document.querySelector('p');
const header = document.querySelector('header');
const suggestions = document.getElementById('suggestions');

//Hold some sample TV shows to suggest user search for
const showSamples = [
    {
        name: "Breaking Bad",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
        alt: "Breaking Bad",
        summary: "Breaking Bad follows protagonist Walter White, a chemistry teacher who is diagnosed with cancer and given a prognosis of two years left to live.  The series follows his transformation from mild family man to a kingpin of the drug trade."
    },
    {
        name: "The Walking Dead",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/297/744148.jpg",
        alt: "The Walking Dead",
        summary: "The Walking Dead tells the story of the months and years that follow after a zombie apocalypse. It follows a group of survivors, led by former police officer Rick Grimes, who travel in search of a safe and secure home."
    },
    {
        name: "The Mandalorian",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/273/683813.jpg",
        alt: "The Mandalorian",
        summary: "The Mandalorian follows the travails of a lone gunfighter in the outer reaches of the galaxy far from the authority of the New Republic..."
    },
    {
        name: "Peaky Blinders",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/48/122213.jpg",
        alt: "Peaky Blinders",
        summary: "An epic gangster drama set in the lawless streets of 1920s Birmingham."
    },
    {
        name: "Vikings",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/286/715906.jpg",
        alt: "Vikings",
        summary: "Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore - and raid - the distant shores across the ocean."
    },
    {
        name: "Resident Alien",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/288/722418.jpg",
        alt: "Resident Alien",
        summary: "Resident Alien follows a crash-landed alien named Harry who, after taking on the identity of a small-town Colorado doctor, slowly begins to wrestle with the moral dilemma of his secret mission on Earth"
    },
];

let showSuggestionsHTML = '';

 //Display the sample tv shows on page everytime index.html is loaded
for(let i = 0; i < showSamples.length; i++) {

    let display = showSamples[i];

    showSuggestionsHTML += `
        <div class="text-light text-center border border-danger rounded samples">
            <img src="${display.image}" alt="${display.alt}" class="m-4">
            <h1 class="shadow-lg text-warning">${display.name}</h1>
            <p class="mx-2 mt-2 shadow-lg">${display.summary}</p>
        </div>
    `;
}

suggestions.innerHTML = showSuggestionsHTML;

//Fetch Function
async function fetchInfo(url) {
    return fetch(url)
        .then(response => response.json())
}

//Helper Functions
function generateList(data) {
    if(data.length === 0){
        header.innerHTML = `
        <div class="container text-center">
            <h1 class="display-1 text-light mt-5">Dinner and a Show</h1>
            <a class="btn btn-warning my-4" href="index.html" role="button">New Search</a>
        </div>
        `;

        main.innerHTML = `
            <div class="text-center text-light">
                <h3>Either no results match this query, or too many do. Click the yellow button above to start a new search.<h3>
            </div>
        `;

    } else {
        let showListContainerHTML = `
        <div class="border-bottom border-warning my-3 mx-5">
            <h3 class="text-warning text-center m-4">Select a Show Below!</h3>
        </div>
        <div class="d-flex flex-column flex-md-row flex-md-wrap px-3" id="suggestions"></div>
        `;
        main.innerHTML = showListContainerHTML;
        let suggestions = document.getElementById('suggestions');
        let showListHTML = '';
        data.filter(element => element.show.image !== null) //filter out shows that have no image to display
            .forEach(element => {
            showListHTML += `
            <div class="text-center border border-danger rounded samples">
                <img src="${element.show.image.medium}" class="m-3">
                <h2 class="text-warning m-3">${element.show.name}</h2>
                <button id="${element.show.name}" class="select btn btn-primary m-3">Get More Info and a Recipe!</button>
            </div>
        `;
        })
        suggestions.innerHTML = showListHTML;
        header.innerHTML = `
            <div class="container text-center">
                <h1 class="display-1 text-light mt-5">Dinner and a Show</h1>
                <a class="btn btn-warning my-4" href="index.html" role="button">New Search</a>
            </div>
        `;
    }
}

function generateInfo(data) {
    let showRecipeContainerHTML = `
        <div class="container mt-lg-5">
            <div class="row px-3" id="result">

            </div>
        </div>
    `;
    main.innerHTML = showRecipeContainerHTML;
    let result = document.getElementById('result');
    result.innerHTML = `
    <div class="col-12 col-md-6 col-lg-12 d-lg-flex flex-lg-row text-center mt-5 border border-bottom-0 border-danger rounded">
        <img src="${data.image.medium}" class="pt-5">
        <div class="d-lg-flex flex-lg-column justify-content-lg-between flex-lg-grow-1 py-5">
            <h2 class="text-warning">${data.name}</h2>
            <h5 class="text-light pt-4">Network: ${data.network.name}</h5>
            <section class="text-light pt-4 px-lg-5">${data.summary}</section>
        </div>
    </div>
    `;
}

function generateRecipe(data) {
    let result = document.getElementById('result');
    let randomRecipe = data[Math.floor(Math.random() * data.length)];
    let recipeHTML = `
    <div class="col-12 col-md-6 col-lg-12 mt-5 border border-bottom-0 border-danger rounded">
        <div class="text-center">
            <img src="${randomRecipe.imageURL}" class="img-recipe pt-5 text-center">
        </div>
        <div class="d-lg-flex flex-lg-column flex-lg-grow-1 p-5">
            <h2 class="text-warning text-center">${randomRecipe.name}</h2>
            <div class="text-light">
                <h3 class="border-bottom border-warning text-center p-4">Ingredients</h3>
                <ul>
                    ${randomRecipe.ingredients.map(elmt => `
                        <li class="my-3">${elmt.name}:  ${elmt.quantity}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="text-light">
                <h3 class="border-bottom border-warning text-center p-4">Steps</h3>
                <ol>
                    ${randomRecipe.steps.map(elmt => `
                    <li class="my-3">${elmt}</li>
                    `).join('')}
                </ol>
            </div>
        </div>
    </div>
    `;
    result.insertAdjacentHTML('beforeend', recipeHTML);
}

//Event Listeners
btnSearch.addEventListener('click', () => {
    let regEx = /\w/;
    if(regEx.test(search.value)){  //make sure user has typed something valid in the search bar
        fetchInfo(`http://api.tvmaze.com/search/shows?q=${search.value}`)
            .then( data => generateList(data) )
    }
});

document.addEventListener('click', e => {
    if(e.target.classList.contains('select')) {
        fetchInfo(`http://api.tvmaze.com/singlesearch/shows?q=${e.target.id}`)
            .then( data => generateInfo(data) )
            .then( () => fetchInfo('recipe.json') )
            .then( data => generateRecipe(data) )
     }
 });