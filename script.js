// Select the container where pokemon card will be displayed
const pokeCard = document.querySelector(".row")


// Select navigation buttons for pagination
const nextBtn = document.querySelector("#nextBtn")
const previousBtn = document.querySelector("#previousBtn")

// Select the search form element
const searchForm = document.querySelector("form")

// Initial API URL to fetch pokemon data. Limits 9 pokemon per request
let url = "https://pokeapi.co/api/v2/pokemon?limit=9"
let previousUrl = null // Stores the previous page URL for pagination

// Function to fetch pokemon data from the api
function getPokemons(link) {
    fetch(link)
        .then(function (resp) {
            return resp.json() // convert the response to JSON
        })
        .then(function (data) {
            previousUrl = data.previous // store previous page URL for pagination
            url = data.next // store next page URL for pagination
            renderPokemons(data.results) // render the pokemon cards
        })
        .catch(function (error) {
            console.error("Error fetching data from the Pokemon API:", error)
        })
}

// Function to search for specific pokemon
function searchPokemon(link) {
    fetch(link)
        .then(function (resp) {
            return resp.json() // convert the response to JSON
        })
        .then(function (data) {
            console.log(data)
            searchPokemon(data)
        })
        .catch(function (error) {
            console.error("Error fetching data from the Pokemon API:", error)
        })
}

// Function to fetch pokemon details of a specific pokemon
function getPokemonDetails(url, element) {
    fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (pokemon) {
            const { abilities, stats, types } = pokemon;
            renderDetails(abilities, stats, element, types) // render pokemon details
        })
        .catch(function (error) {
            console.error("Error fetching data", error)
        })
}

// function to render pokemon cards dynamically
function renderPokemons(pokemons) {
    pokeCard.innerHTML = "" // clear previous content
    pokemons.forEach(function (pokemon, index) {
        //create a card for each pokemon
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("data-url", pokemon.url)
        card.style.width = "20rem"

        // construct the image URL base on pokemon id
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split("/")[6]}.svg`

        // define the cards front and back content
        card.innerHTML = `
         <div class="card-face card-front">
                    <img src="${imgSrc}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <button class="btn btn-primary viewBtn">View Details</button>
                    </div>
                </div>
                <div class="card-face card-back">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <div class="card-details">Details about ${pokemon.name}</div>
                        <button class="btn btn-primary backBtn">Back</button>
                    </div>
                </div>
        `;

        pokeCard.appendChild(card)
    })

    // Add event listeners to view details buttons
    document.querySelectorAll(".viewBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
            e.target.closest(".card").querySelector(".card-front").style.display = "none"
            e.target.closest(".card").querySelector(".card-back").style.display = "block"
            getPokemonDetails(e.target.closest(".card").dataset.url, e.target.closest(".card").querySelector(".card-details"))
        })
    })

    // Add event listeners to back buttons
    document.querySelectorAll(".backBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
            e.target.closest(".card").querySelector(".card-front").style.display = "block"
            e.target.closest(".card").querySelector(".card-back").style.display = "none"
        })
    })

    // Show or hide pagination buttons
    showPagination()
}

// Function to handle pagination visibility
function showPagination() {
    if (previousUrl) {
        previousBtn.style.display = "inline"
    } else {
        previousBtn.style.display = "none"
    }
    if (url) {
        nextBtn.style.display = "inline"
    } else {
        nextBtn.style.display = "none"
    }
}

// Function to render pokemon details on the back of the card
function renderDetails(abilities, stats, element, types) {
    element.innerHTML = ""

    // Create and append the abilities section
    const abilitiesTitle = document.createElement("h6")
    abilitiesTitle.textContent = "Abilities:"
    element.appendChild(abilitiesTitle)

    const abilitiesList = document.createElement("ul")
    abilities.forEach(function (ability) {
        const abilityItem = document.createElement("li")
        abilityItem.textContent = ability.ability.name
        abilitiesList.appendChild(abilityItem)
        element.appendChild(abilitiesList)
    })

    // Create and append the stats section
    const statsTitle = document.createElement("h6")
    statsTitle.textContent = "Stats:"
    element.appendChild(statsTitle)

    const statsList = document.createElement("ul")
    stats.forEach(function (stat) {
        const statItem = document.createElement("li")
        statItem.textContent = `${stat.stat.name} ${stat.base_stat}`
        statsList.appendChild(statItem)
        element.appendChild(statsList)
    })

    // Crete and append the types section
    const typesTitle = document.createElement("h6")
    typesTitle.textContent = "Types:"
    element.appendChild(typesTitle)

    const typesList = document.createElement("ul")
    types.forEach(function (type) {
        const typeItem = document.createElement("li")
        typeItem.textContent = type.type.name
        typesList.appendChild(typeItem)
        element.appendChild(typesList)
    })

}

function renderSearchedPokemon (pokemon) {
    const pokeSearch = document.querySelector(".searchedPokemon")
    pokeCard.innerHTML = "" // clear previous content
        //create a card for each pokemon
        const searchCard = document.createElement("div")
        card.classList.add("card")
        card.style.width = "20rem"

        // construct the image URL base on pokemon id
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split("/")[6]}.svg`

        // define the cards front content
        card.innerHTML = `
         <div class="card-face card-front">
                    <img src="${imgSrc}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <button class="btn btn-primary viewBtn">View Details</button>
                    </div>
                </div>
        `;

        pokeSearch.appendChild(searchCard)
    }


// Event listener to load pokemon when the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    getPokemons(url) // Fetch initial pokemon data

    // Event listener for search form submission
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(e.target.search.value)
        let url = `https://pokeapi.co/api/v2/pokemon/${e.target.search.value}?limit=9`
        searchPokemon(url) // Fetch pokemon data based on search input
    })

    // Event listener for next button to load more pokemon
    nextBtn.addEventListener("click", function () {
        getPokemons(url)
    })

    // Event listener for previous button to load the previous set of pokemon
    previousBtn.addEventListener("click", function () {
        getPokemons(previousUrl)
    })
})
