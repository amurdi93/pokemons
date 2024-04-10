import { PokemonType } from "@/app/interfaces/pokemons-response";
import { getPokemon, getPokemonByType } from "@/lib/pokemonAPI";
import Image from "next/image";

export default async function PokemonTypePage({ params }: { params: { pokemonType: string } }) {
  const { pokemonType } = params;

  const pokemonObject = await getPokemonByType(pokemonType);
  

    console.log(pokemonObject);

    // Obtener el tipo del Pokémon actual
    const type = pokemonObject.types[0].type.name;
  // Obtener los Pokémon del mismo tipo
  const pokemonList = 

 

  return (
    <>
      <h1 className="text-4xl text-bold pt-4">Pokémon of type {pokemonType}</h1>
      <ul>
        {pokemonList.map((pokemon: any) => (
          <li key={pokemon.name}>
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="50"
              height="50"
            />
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}