import { Progress } from "@/components/ui/progress";
import { getPokemon, getPokemonByType } from "@/lib/pokemonAPI";
import Image from "next/image";

// localhost:3000/pikachu

// pokemonName

// pokemonName = "pikachu" -> show the Pikachu page

// Vercel CLI -> We can fully deploy our application using the command line
// If things are breaking for you (for any reason), go check out how to 
// deploy from github.

export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {
    // Object destructuring
    const { pokemonName } = params;
    // pikachu
    // get the API data for pikachu
    const pokemonObject = await getPokemon(pokemonName);

    console.log(pokemonObject);

    // Obtener el tipo del Pokémon actual
    const type = pokemonObject.types[0].type.name;

    // Obtener los Pokémon del mismo tipo
    const pokemonList = await getPokemonByType(type);

    return (
        <>
            <h1 className="text-4xl text-bold pt-4">{pokemonName}</h1>
            <div className="m-4" style={{ position: "relative", width: '300px', height: '300px'}}></div>
            <Image
                src={pokemonObject.sprites.other['official-artwork'].front_default }
                alt={"picture of " + pokemonName}
                width="200"
                height="200"
            />           
            
             <h3>Weight: {pokemonObject.weight}</h3>
            <div className="flex-col">
                {pokemonObject.stats.map( (statObject : any) => {
                    const statName = statObject.stat.name;
                    const statValue = statObject.base_stat;

                    return (
                        <div className="flex items-stretch" style={{width: "500px"}} key={statName}>
                            <h3 className="p-3 w-2/4">{statName}: {statValue}</h3>
                            <Progress className="w-2/4 m-auto" value={statValue} />
                        </div>
                    )
                })}
            </div>

{/* Mostrar los Pokémon del mismo tipo */}
<h2>Other {type} Pokémon:</h2>
            <ul>
                {pokemonList.map((pokemon: any) => (
                    <li key={pokemon.name}>
                        <Image
                            src={pokemon.sprites.other['official-artwork'].front_default }
                            alt={pokemon.name}
                            width="50"
                            height="50"
                        />
                        <span>{pokemon.name}</span>
                    </li>
                ))}
            </ul>


        </>
    )

}