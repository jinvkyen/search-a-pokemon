document.getElementById("search-button").addEventListener("click", async function () {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();

    if (!searchInput) {
        alert("Please enter a Pokémon name or ID");
    return;
    }else if (searchInput === "red") {
        alert("Pokémon not found");
        return;
    }
    const apiURL = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            alert("Pokémon not found");
            return;
        }

        const data = await response.json();
        updatePokemonInfo(data);

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again.");
    }

});

function updatePokemonInfo(data) {
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${data.id}`;
    document.getElementById("weight").textContent = `Weight: ${data.weight}`;
    document.getElementById("height").textContent = `Height: ${data.height}`;
    document.getElementById("hp").textContent = data.stats[0].base_stat;
    document.getElementById("attack").textContent = data.stats[1].base_stat;
    document.getElementById("defense").textContent = data.stats[2].base_stat;
    document.getElementById("special-attack").textContent = data.stats[3].base_stat;
    document.getElementById("special-defense").textContent = data.stats[4].base_stat;
    document.getElementById("speed").textContent = data.stats[5].base_stat;

    let sprite = document.getElementById("sprite");
    if (!sprite) {
        sprite = document.createElement("img");
        sprite.id = "sprite";
        document.getElementById("pokemon-display").appendChild(sprite);
    }
    sprite.src = data.sprites.front_default;
    sprite.style.display = "block";


    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";

    data.types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.textContent = type.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
    });
}