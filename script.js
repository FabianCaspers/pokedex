

let currentPokemon;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon)

    renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonID').innerHTML += currentPokemon['id'];
    document.getElementById('pokemonType').innerHTML += currentPokemon['types']['0']['type']['name'];
    // Aktuelles Pokemon Bild
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

}


function currentStats() {
    // Stats laden für aktuelles Pokemon
    document.getElementById('stat0').innerHTML += currentPokemon['stats']['0']['base_stat'];
    document.getElementById('stat1').innerHTML += currentPokemon['stats']['1']['base_stat'];
    document.getElementById('stat2').innerHTML += currentPokemon['stats']['2']['base_stat'];
    document.getElementById('stat3').innerHTML += currentPokemon['stats']['3']['base_stat'];
    document.getElementById('stat4').innerHTML += currentPokemon['stats']['4']['base_stat'];
    document.getElementById('stat5').innerHTML += currentPokemon['stats']['5']['base_stat'];
}



function openBaseStats() {

    document.getElementById('showInfos').innerHTML += /*html*/`
    <div class="statInfos">
        <div class="stat1">
            <p>HP</p><p>Attack</p><p>Defense</p><p>Sp. Atk</p><p>Sp.Def</p><p>Speed</p>
        </div>

        <div class="stat2">
            <p id="stat0"></p><p id="stat1"></p><p id="stat2"></p><p id="stat3"></p><p id="stat4"></p><p id="stat5"></p>
        </div>

        <div class="progress" style="height: 20px;">
  <div class="progress-bar" id="progress-bar" role="progressbar" aria-label="Example 20px high" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
    </div>
   
   
    `;
    currentStats();

}


