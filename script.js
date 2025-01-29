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

function getPokemonDetails(url, element) {
    fetch(url)
    .then(function(resp) {
        return resp.json()
    })
    .then(function (pokemon) {
        const {abilities, stats, types } = pokemon;
        renderDetails(abilities, stats, element, types)
    })
    .catch(function (error) {
        console.error("Error fetching data", error)
    })
}

function renderPokemons(pokemons) {
    pokeCard.innerHTML = ""
    pokemons.forEach(function (pokemon, index) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-url", pokemon.url)
        card.style.width = "20rem";
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split("/")[6]}.svg`;

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

        pokeCard.appendChild(card);
    });
    document.querySelectorAll(".viewBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
            e.target.closest(".card").querySelector(".card-front").style.display = "none"
            e.target.closest(".card").querySelector(".card-back").style.display = "block"
           getPokemonDetails(e.target.closest(".card").dataset.url, e.target.closest(".card").querySelector(".card-details"))
        })
    })
    document.querySelectorAll(".backBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
             e.target.closest(".card").querySelector(".card-front").style.display = "block"
            e.target.closest(".card").querySelector(".card-back").style.display = "none"
        })
    })

}

function renderDetails(abilities, stats, element, types) {
    console.log(element)
    element.innerHTML = ""
    const abilitiesList = document.createElement("ul")
    abilities.forEach(function(ability) {
        const abilityItem = document.createElement("li")
        abilityItem.textContent = ability.ability.name
        abilitiesList.appendChild(abilityItem)
    })
    const statsList = document.createElement("ul")
    stats.forEach(function(stat){
        const statItem = document.createElement("li")
        statItem.textContent = `${stat.stat.name} ${stat.base_stat}`
        statsList.appendChild(statItem)
    })
    const typesList = document.createElement("ul")
    types.forEach(function(type){
        const typeItem = document.createElement("li")
        typeItem.textContent = type.type.name
        typesList.appendChild(typeItem)
    })

    element.appendChild(abilitiesList)
    element.appendChild(statsList)
    element.appendChild(typesList)
}



document.addEventListener("DOMContentLoaded", function () {
    getPokemons()

    const nextBtn = document.querySelector("#nextBtn")
    nextBtn.addEventListener("click", getPokemons)

})
