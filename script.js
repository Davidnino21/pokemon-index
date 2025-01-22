const pokeCard = document.querySelector(".row");
let url = "https://pokeapi.co/api/v2/pokemon?limit=9"

function getPokemons() {
    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            renderPokemons(data.results)
            url = data.next
        })
        .catch(function (error) {
            console.error("Error fetching data from the Pokemon API:", error);
        });
}

function renderPokemons(pokemons) {
    pokeCard.innerHTML = ""
    pokemons.forEach(function (pokemon, index) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "20rem";
        
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`;
        console.log(imgSrc)
        
        card.innerHTML = `
        <img src="${imgSrc}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">A Pokémon from the Pokémon API.</p>
        <a href="pokedetails.html?url=${pokemon.url}" class="btn btn-primary" id= "viewBtn">View Details</a>
        </div>
        `;
        
        pokeCard.appendChild(card);
    });
}



document.addEventListener("DOMContentLoaded", function () {
    getPokemons()

    const nextBtn = document.querySelector("#nextBtn")
    nextBtn.addEventListener("click", getPokemons)
})
