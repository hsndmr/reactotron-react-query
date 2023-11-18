import { StyleSheet, View } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import PokemonList from './PokemonList';

if(__DEV__) {
  require("./reactotron.ts")
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <PokemonList />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
