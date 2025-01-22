const pokeCard = document.querySelector(".row");

fetch("https://pokeapi.co/api/v2/pokemon?limit=9")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(data);

        data.results.forEach(function (pokemon, index) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "20rem";

            const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
            console.log(imgSrc)

            card.innerHTML = `
        <img src="${imgSrc}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.name}</h5>
          <p class="card-text">A Pokémon from the Pokémon API.</p>
          <a href="https://pokeapi.co/api/v2/pokemon/${index + 1}" target="_blank" class="btn btn-primary" id= "viewBtn">View Details</a>
        </div>
      `;

            pokeCard.appendChild(card);
        });
    })
    .catch(function (error) {
        console.error("Error fetching data from the Pokemon API:", error);
    });
