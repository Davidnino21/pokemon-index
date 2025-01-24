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
        const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split("/")[6]}.svg`;
        console.log(imgSrc)

        card.innerHTML = `
         <div class="card-face card-front">
                    <img src="${imgSrc}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">A Pokémon from the Pokémon API.</p>
                        <button class="btn btn-primary viewBtn">View Details</button>
                    </div>
                </div>
                <div class="card-face card-back">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Details about ${pokemon.name}</p>
                        <button class="btn btn-primary backBtn">Back</button>
                    </div>
                </div>
        `;

        pokeCard.appendChild(card);
    });
    document.querySelectorAll(".viewBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
        })
    })
    document.querySelectorAll(".backBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest(".card").classList.toggle("is-flipped")
        })
    })

}



document.addEventListener("DOMContentLoaded", function () {
    getPokemons()

    const nextBtn = document.querySelector("#nextBtn")
    nextBtn.addEventListener("click", getPokemons)

})
