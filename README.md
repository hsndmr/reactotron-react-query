# Reactotron React Query for React Native

![Screenshot](reactotron.png)

Is there a plugin for Reactotron that allows for similar functionality to the React Query Devtools? Yes! This plugin helps you debug your React Query cache and queries in Reactotron.

## Installation

```bash
npm i reactotron-react-native --save-dev
npm i reactotron-react-query --save-dev
```

## Usage

Create a file queryClient.ts

```typescript
import { QueryClient } from "react-query";
const queryClient = new QueryClient();

export { queryClient };
```

Create a file reactotron.js.

```typescript
import Reactotron from "reactotron-react-native";
import { queryClient } from "./queryClient";
import {
  QueryClientManager,
  reactotronReactQuery,
} from "reactotron-react-query";

const queryClientManager = new QueryClientManager({
  queryClient,
});
Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();

```


Import the queryClient and reactotron in your App.js file.

```jsx
import { StyleSheet, Text, View } from "react-native";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./queryClient";

if (__DEV__) {
  // @ts-ignore
  import("./reactotron");
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

```
