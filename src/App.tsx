import React from 'react';
import { api } from './pokemonApi';

export function App() {
  const [selectedPokemon, selectPokemon] = React.useState<string | undefined>();

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
      </header>
      <main>
        {selectedPokemon ? (
          <>
            <PokemonDetails pokemonName={selectedPokemon} />
            <button onClick={() => selectPokemon(undefined)}>back</button>
          </>
        ) : (
          <PokemonList onPokemonSelected={selectPokemon} />
        )}
      </main>
    </>
  );
}

function PokemonList({
  onPokemonSelected,
}: {
  onPokemonSelected: (pokemonName: string) => void;
}) {
  const { data, isLoading, isError, isSuccess } = api.usePokemonListQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (isSuccess)
    return (
      <article>
        <h2>Overview</h2>
        <ol start={1}>
          {data?.results.map((pokemon) => (
            <li key={pokemon.name}>
              <button onClick={() => onPokemonSelected(pokemon.name)}>
                {pokemon.name}
              </button>
            </li>
          ))}
        </ol>
      </article>
    );
}

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'short',
  type: 'conjunction',
});

function PokemonDetails({ pokemonName }: { pokemonName: string }) {
  const { data, isLoading, isError, isSuccess } = api.usePokemonDetailQuery({
    name: pokemonName,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (isSuccess)
    return (
      <article>
        <h2>{data.name}</h2>
        <img
          src={data.sprites.front_default}
          alt={data.name}
        />
        <ul>
          <li>id: {data.id}</li>
          <li>height: {data.height}</li>
          <li>weight: {data.weight}</li>
          <li>
            types:
            {listFormatter.format(data.types.map((item) => item.type.name))}
          </li>
        </ul>
      </article>
    );
}
