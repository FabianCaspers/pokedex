let currentPokemon;

async function loadAllPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemeon', currentPokemon)
}