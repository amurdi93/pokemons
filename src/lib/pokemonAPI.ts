const POKEMON_API = "https://pokeapi.co/api/v2/";

// getPokemonList -> Get the first 151 pokemon 
export async function getPokemonList() {
    const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
    const data = await response.json();
    return data.results;
}

// getPokemon -> given a string "pikachu", get the information of pikachu
export async function getPokemon(name: string) {
    // pokemon/ditto
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
    }
    
    const data = await response.json();
    return data;
}

// getPokemonByType -> given a string "fire", get the information of all fire type pokemon
export async function getPokemonByType(type: string) {
    const response = await fetch(POKEMON_API + `type/${type}`);
    const data = await response.json();
    const pokemonList = data.pokemon.map((pokemon: any) => pokemon.pokemon);
    const pokemonPromises = pokemonList.map((pokemon: any) => fetch(pokemon.url));
    const pokemonResponses = await Promise.all(pokemonPromises);
    const pokemonData = await Promise.all(pokemonResponses.map((response) => response.json()));
    return pokemonData;
  }