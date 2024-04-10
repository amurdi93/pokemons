import { PokemonGrid } from "@/components/pokemon-grid";
import { PokemonsReponse, PokemonType } from "./interfaces/pokemons-response";
import { SimplePokemon } from "./interfaces/simple-pokemon";
import { getPokemonList } from "@/lib/pokemonAPI";
import Link from 'next/link'; // Importa Link de next/link


const getPokemons = async( limit=18, offset = 0): Promise<SimplePokemon[]> => {
  const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/type?limit=${limit}&offset=${ offset }`)
.then( res => res.json() )

const pokemons = data.results.map( pokemon => ({
  id: pokemon.url.split('/').at(-2)!,
  name: pokemon.name,
}) );
return pokemons;
}

const getPokemonTypes = async (): Promise<PokemonType[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  return data.results.slice(0, 18);
};

  const PokemonsPage = async () => {
    const pokemonTypes = await getPokemonTypes();
  
    return (
     
      <div className="flex flex-col items-center">
        <PokemonGrid />

            <h2 className="pokemon-title">Tipos de Pokemon</h2>
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {pokemonTypes.map((pokemonType) => (
          <Link key={pokemonType.name} href={`/type/${pokemonType.name}`}>
            
          {/* Utiliza Link en lugar de un botón */}
          <span className="pokemon-type-button" style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            background: '#f0f0f0', // Light gray background
            color: '#333', // Dark gray text
            cursor: 'pointer', // Indicate interactivity
            textDecoration: 'none', // Remove default link underline
          }}>
            {pokemonType.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
  export default PokemonsPage;