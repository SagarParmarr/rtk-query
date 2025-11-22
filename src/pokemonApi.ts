import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface PokemonListing {
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonDetailData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string;
  };
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    PokemonList: build.query<PokemonListing, void>({
      query() {
        return {
          url: 'pokemon',
          params: {
            limit: 9,
          },
        };
      },
    }),
    PokemonDetail: build.query<PokemonDetailData, { name: string }>({
      query({ name }) {
        return {
          url: `pokemon/${name}`,
        };
      },
    }),
  }),
});
