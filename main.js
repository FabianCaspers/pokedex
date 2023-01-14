const API = `https://pokeapi.co/api/v2/pokemon/`;
let currentPokemon = [];
let loadedPokemon = [];
let next = [];
let currentID;

function loadAllPokemons() {
    loadPokemon();
}



//Load next 20 Pokemon
async function loadPokemon() {
    await loadNewPokemonBaseData();         //Load base Data
    await loadNewPokemonData();                   //load pokemons
} 

//Load the next 20 Pokemons
async function loadNewPokemonBaseData() {
    let url = API + next;
    let response = await fetch(url);
    let newPokemon = await response.json();
    defineNextPokemon(newPokemon);                  
    let pokemon = newPokemon['results'];
    addToCurrentPokemon(pokemon);
}     

//The next 20 Pokemons pushed in the Array
function defineNextPokemon(newPokemon) {
    let newNext = newPokemon['next'].split('?')[1];    
    next = [];                                          
    next.push('?' + newNext);                           
}


//added loaded Pokemons in Array
function addToCurrentPokemon(pokemon) {
    currentPokemon = [];                                     
    for (let i = 0; i < pokemon.length; i++) {
        currentPokemon.push(pokemon[i])
    };
}


//load all datas from the pokemon
async function loadNewPokemonData() {
    for (let i = 0; i < currentPokemon.length; i++) {            
        let currentSinglePokemon = currentPokemon[i];
        let url = currentSinglePokemon['url'];                        
        let response = await fetch(url);
        let newPokemon = await response.json();                 

        renderPokemon(newPokemon);                              
        checkTypeForColor(newPokemon, newPokemon['id']);        
        addToLoadedPokemon(newPokemon);                         
        
    }
}


//add pokemon to loadedPokemon
function addToLoadedPokemon(newPokemon) {
    loadedPokemon.push(newPokemon);
}


//load the current img of the pokemon
function loadPokemonImg(pokemon) {
    document.getElementById('stat-img').src = `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
}

//first letter uppercase
function renderPokemon(newPokemon) {
    let firstLetter = newPokemon['name'].charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = newPokemon['name'].slice(1);
    let pokemonCapitalized = firstLetterCap + remainingLetters;
    renderPokemonHtml(newPokemon, pokemonCapitalized);
    renderTypeHtml(newPokemon);
}


//load the searched Pokemon
function loadSearchedPokemon(search) {
    for (let i = 0; i < loadedPokemon.length; i++) {                        
        let pokemon = loadedPokemon[i];
        if (pokemon['species']['name'].toLowerCase().includes(search)) {    
            renderPokemon(pokemon, i);                                      
            checkTypeForColor(pokemon, pokemon['id']);
        }
    }
}

//Select the color by type
function checkTypeForColor(newPokemon, id) {
    let type = newPokemon['types'][0]['type']['name'];                      //define the type
    document.getElementById(`pokemon${id}`).classList.add('bg-' + type);    //select the right classlist
}







//load name with uppercase
function loadNameCapitalized(pokemon) {
    let firstLetter = pokemon['name'].charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = pokemon['name'].slice(1);
    let pokemonCapitalized = firstLetterCap + remainingLetters;
    document.getElementById('species').innerHTML = pokemonCapitalized;
}



//show arrow
function showArrows(id) {
    if (id > 1) {                                                                     
        document.getElementById('slide-left').classList.remove('d-none');
    }                                                                                
    document.getElementById('slide-right').classList.remove('d-none');
}


//hide arrow
function hideArrows() {
    document.getElementById('slide-left').classList.add('d-none');
    document.getElementById('slide-right').classList.add('d-none');
}



//open stats 
function openStats(id) {
    currentId = id;
    let pokemon = loadedPokemon[id - 1];
    let name = pokemon['types'][0]['type']['name'];        
    loadStatsContainer(name);
    loadPokemonImg(pokemon);
    showArrows(id);
    loadNameCapitalized(pokemon);
    addPokemonNumber(id);
    renderStatsTypes(pokemon);
    loadAbout(pokemon);
    loadBaseStats(pokemon, name);
    loadMoves(pokemon);
}


//load container of the stats from the pokemons
function loadStatsContainer(name) {
    document.getElementById('pokeStats-container').className = '';                                 
    document.getElementById('pokeStats-container').classList.add('pokeStats-container');          
    document.getElementById('pokeStats-container').classList.add('show-stats');                    

    let type = name;
    document.getElementById('pokeStats-container').classList.add('bg-' + type);                    

    document.getElementById('pokeStats-bg').classList.add('show-stats-bg');                        

    document.getElementById('body').classList.add('overflow-hidden');                               
}


//add number of the pokemon
function addPokemonNumber(id) {
    document.getElementById('id-container').innerHTML = '';
    document.getElementById('id-container').innerHTML = id;
}


//open about
function openAbout() {
    document.getElementById('about-selector').classList.add('selected-info');
    document.getElementById('base-stats-selector').classList.remove('selected-info');
    document.getElementById('moves-selector').classList.remove('selected-info');

    document.getElementById('about').classList.remove('d-none');
    document.getElementById('base-stats').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
}


//load all stats
function loadAbout(pokemon) {
    loadBaseExperience(pokemon);                
    loadHeight(pokemon);                                    
    loadWeight(pokemon);                        
    loadAbilities(pokemon);                     
}


//open base stats
function openBaseStats() {
    document.getElementById('about-selector').classList.remove('selected-info');
    document.getElementById('base-stats-selector').classList.add('selected-info');
    document.getElementById('moves-selector').classList.remove('selected-info');

    document.getElementById('about').classList.add('d-none');
    document.getElementById('base-stats').classList.remove('d-none');
    document.getElementById('moves').classList.add('d-none');
}


//load base stats
function loadBaseStats(pokemon, name) {
    for (let i = 0; i < pokemon['stats'].length; i++) {                                 

        let stat = pokemon['stats'][i]['base_stat'];                                         
        document.getElementById('base-stat' + i).style = `width: ${stat}px;`
        document.getElementById('stat-number' + i).innerHTML = `${stat}`;

        document.getElementById('base-stat' + i).className = '';                        
        document.getElementById('base-stat' + i).classList.add('actual-progress');

        let type = name;
        document.getElementById('base-stat' + i).classList.add('bg-' + type);          //bar will be colored the same like type
    }
}

//open moves
function openMoves() {
    document.getElementById('about-selector').classList.remove('selected-info');
    document.getElementById('base-stats-selector').classList.remove('selected-info');
    document.getElementById('moves-selector').classList.add('selected-info');

    document.getElementById('about').classList.add('d-none');
    document.getElementById('base-stats').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');
}


//load moves on stats
function loadMoves(pokemon) {
    document.getElementById('moves').innerHTML = '';
    for (let i = 1; i < pokemon['moves'].length; i++) {
        let move = pokemon['moves'][i]['move']['name'];
        renderMoves(move);
    }
}

//close the stats
function closeStats() {
    document.getElementById('pokeStats-container').classList.remove('show-stats');
    document.getElementById('pokeStats-bg').classList.remove('show-stats-bg');
    document.getElementById('body').classList.remove('overflow-hidden');
    hideArrows();
}

//next pokemon
async function slideRight() {
    if (currentId == loadedPokemon.length) {            
        await loadPokemon();                            
        currentId++;
        openStats(currentId);                           
    } else {
        currentId++;
        openStats(currentId);
    }
}


//previous pokemon
function slideLeft() {
    currentId--;
    openStats(currentId);
    if (currentId == 1) {
        document.getElementById('slide-left').classList.add('d-none');         
    }
}

//search function
function pokemonNames() {
    let search = document.getElementById('search-pokemon').value;
    search = search.toLowerCase();
    document.getElementById('allPokemons').innerHTML = '';                  //delete the index page, to show the searched pokemon
    loadSearchedPokemon(search);                                        
}


//load searched pokemon
function loadSearchedPokemon(search) {
    for (let i = 0; i < loadedPokemon.length; i++) {                        
        let pokemon = loadedPokemon[i];
        if (pokemon['species']['name'].toLowerCase().includes(search)) {    //If the first letters matches, then shows the right pokemons
            renderPokemon(pokemon, i);                                      
            checkTypeForColor(pokemon, pokemon['id']);
        }
    }
}