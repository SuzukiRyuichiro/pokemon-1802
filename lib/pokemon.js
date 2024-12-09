// TODO write your code here
// https://pokeapi.co/api/v2/pokemon

const url = "https://pokeapi.co/api/v2/pokemon";

// Get the template
const template = document.getElementById("cardTemplate");
// select the info template

const infoTemplate = document.getElementById("infoTemplate");
// Get the cards container
const container = document.getElementById("cardsContainer");
// Get the info container
const infoContainer = document.getElementById("infoContainer");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // get the results array from the data
    // iterate over the array
    data.results.forEach((pokemon) => {
      // make fetch to the individual pokemon info URL

      fetch(pokemon.url)
        // parse the json
        .then((response) => response.json())
        .then((pokemonData) => {
          // clone the template
          const clone = template.content.cloneNode(true);
          // insert the name of pokemon into the title part of the card
          clone.querySelector("h2").textContent = pokemon.name;
          // insert the card into the cards container

          // get the front sprites
          const image = pokemonData.sprites.front_default;
          // insert the front sprite image url to the image element
          clone.querySelector("img").src = image;
          // get the types of the pokemon
          const types = pokemonData.types.map((type) => {
            return type.type.name;
          });
          // insert the types of the pokemon (comma separated) into the subtitle element
          clone.querySelector("p").innerHTML = types.join(", ");

          // get the anchor tag to attach an event listener
          clone.querySelector("a").addEventListener("click", () => {
            // Clear the info container
            infoContainer.innerHTML = "";

            // once it get's clicked
            // clone the info template
            const infoClone = infoTemplate.content.cloneNode(true);
            // fill the info
            infoClone.querySelector("h2").textContent = pokemon.name;
            const image = pokemonData.sprites.front_default;
            infoClone.querySelector("img").src = image;
            const types = pokemonData.types.map((type) => {
              return type.type.name;
            });
            infoClone.querySelector("p").innerHTML = types.join(", ");

            // insert it to the info container
            infoContainer.appendChild(infoClone);
          });

          container.appendChild(clone);
        });
    });
  });
