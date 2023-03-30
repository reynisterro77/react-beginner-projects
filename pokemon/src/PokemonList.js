import React from "react";

//props olarak gelir pokemon
export default function PokemonList({pokemon}){
    return (
        <div>
            {pokemon.map(p=>(
                <div key={p}>{p}</div>
            ))}
        </div>
    );
}



