import { ReactotronCore } from "reactotron-core-client"

import { MutationEvent, QueryEvent } from "./query-cache-notify-event.interface"

const queryStateTypes = ["observerResultsUpdated"]

const disableQueryTypes = ["observerOptionsUpdated", "updated"]

const disableMutationTypes = ["observerOptionsUpdated", "observerRemoved", "observerAdded"]

export const broadcastMutationEvent = (reactotron: ReactotronCore, event: MutationEvent | undefined) => {
  if (disableMutationTypes.includes(event?.type)) {
    return
  }

  if (event?.mutation) {
    reactotron.send("state.action.complete", {
      name: "mutation",
      action: {
        type: event.type,
        mutation: event.mutation,
      },
    })
  }
}

export const broadcastReactQueryEvent = (reactotron: ReactotronCore, event: QueryEvent | undefined) => {
  if (disableQueryTypes.includes(event?.type)) {
    return
  }

  if (!queryStateTypes.includes(event?.type)) {
    reactotron.display({
      name: `${event?.type}${event?.query.queryHash}`,
      value: event?.query,
    })
  } else {
    reactotron.send("state.values.response", {
      path: `React Query (${event?.type}) ${event?.query.queryHash}`,
      value: event?.query.state,
      valid: true,
    })
  }
}
