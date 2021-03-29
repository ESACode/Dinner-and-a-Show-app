const btnSearch = document.getElementById('searchButton');
const search = document.getElementById('search');
const main = document.querySelector('main');
const heading = document.getElementById('heading');
const paragraph = document.querySelector('p');
const header = document.querySelector('header');

//Hold some sample TV shows to suggest user search for.  // Comment on spaces
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

let html1 = ''; // Comment on naming

 //Display the sample tv shows on page everytime index.html is loaded.
for(let i = 0; i < showSamples.length; i++) {

    let display = showSamples[i];

    html1 += `
        <div class="text-light text-center">
            <img src="${display.image}" alt="${display.alt}">
            <h1>${display.name}</h1>
            <p>${display.summary}</p>
        </div>
    `;
}

main.insertAdjacentHTML('beforeend', html1);

//Fetch Functions ---------------------------------------------------------------------------------------------------------------------
async function fetchInfo(url) { // Comment on async
    return fetch(url)
        .then(response => response.json())
}

// Comment on dead code
//function fetchJSON(url) {
    //return fetch(url)
        //.then(response => response.json())
        //.then(output => console.log(output[Math.floor(Math.random() * output.length)]))
//}

//fetchJSON(`recipe.json`);
//Helper Function ---------------------------------------------------------------------------------------------------------------------

function generateList(data) {
    let html2 = ''; // Comment on naming
    data.filter(element => element.show.image !== null) //filter out shows that have no image to display
        .forEach(element => {  // Comment on map
        html2 += `
        <div class="text-light text-center">
            <img src="${element.show.image.medium}" alt>
            <h2>${element.show.name}</h2>
            <button id="${element.show.name}" class="select">Get More Info and a Recipe</button>
        </div>
    `;
    })
    main.innerHTML = html2;
    heading.innerText = "Select a show below!";
}

function generateInfo(data) {
    heading.innerText = "";
    main.innerHTML = `
    <div class="text-center">
        <img src="${data.image.medium}" class="center-block" alt>
        <p class="text-light text-center">${data.name}</p>
        <section class="text-light text-center">${data.summary}</section>
    </div>
    `;
}

function generateRecipe(data) {
    let randomRecipe = data[Math.floor(Math.random() * data.length)]; // Comment on error handling
    let html3 = `
    <div class="text-center">
        <img src="${randomRecipe.imageURL}" class="img-responsive" alt>
        <h1 class="text-light text-center">${randomRecipe.name}</h1>
        <div class="text-light text-center">
            <strong>Steps</strong>
            <ol>
                ${randomRecipe.steps.map(elmt => `
                <li>${elmt}</li>
                `).join('')}
            </ol>
        </div>
        <div class="text-light text-center">
            <strong>Ingredients</strong>
            <ul>
                ${randomRecipe.ingredients.map(elmt => `
                <li>${elmt.name} ${elmt.quantity}</li>
                `).join('')}
            </ul
        </div>
    </div>
    `;
    main.insertAdjacentHTML('beforeend', html3); // Comment on naming
    header.insertAdjacentHTML('beforeend', '<a href="index.html">New Search</a>');
}

//Event Listeners ---------------------------------------------------------------------------------------------------------------------
btnSearch.addEventListener('click', () => {
    let regEx = /[a-zA-Z]/; // Comment on regex and errors
    if(regEx.test(search.value)){
    fetchInfo(`http://api.tvmaze.com/search/shows?q=${search.value}`) // Comment on indentation
        .then( data => generateList(data) )
    }
});

document.addEventListener('click', e => {
    if(e.target.className === 'select') {
        fetchInfo(`http://api.tvmaze.com/singlesearch/shows?q=${e.target.id}`)
            .then( data => generateInfo(data) )
            .then( () => fetchInfo(`recipe.json`) )
            .then( data => generateRecipe(data) )
     }
 });
