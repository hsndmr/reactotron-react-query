import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export interface Pokemon {
  id: number;
  name: string;
}

const fetchPokemons = async function(): Promise<Pokemon> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  return data.results.map((result: any, index: number) => {
    return {
      id: index + 1,
      name: result.name
    };
  });
}

export default function PokemonList() {

  const {isLoading, data} = useQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  }) as {
    isLoading: boolean;
    data: Pokemon[];
  }

  if(isLoading) {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data} renderItem={({item}) => {
        return (
          <View>
            <Text>{item.name}</Text>
          </View>
        )
    }} />
  )
}
