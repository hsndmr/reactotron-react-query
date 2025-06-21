import Reactotron from "reactotron-react-native"
import { QueryClientManager, reactotronReactQuery } from "reactotron-react-query"
import { queryClient } from "./queryClient"

const queryClientManager = new QueryClientManager({
  // @ts-ignore
  queryClient,
})

Reactotron.configure({
  onDisconnect: () => {
    queryClientManager.unsubscribe()
  },
})
  .use(reactotronReactQuery(queryClientManager))
  .useReactNative()
  .connect()
