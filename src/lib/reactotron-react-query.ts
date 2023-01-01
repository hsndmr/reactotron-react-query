import { ReactotronCore } from "reactotron-core-client";
import { QueryClientManager } from "./query-client-manager";
import { broadcastReactQueryEvent } from "./reactotron-helpers";

function reactotronReactQuery(queryClientManager: QueryClientManager) {
  return (reactotron: ReactotronCore) => {
    queryClientManager.subscribe((event) =>
      broadcastReactQueryEvent(reactotron, event)
    );

    return {
      onCommand: ({ type, payload }: { type: string; payload?: any }) => {
        switch (type) {
          case "state.action.dispatch":
            if (payload.action.queryHash) {
              queryClientManager.fetchQueryByHash(payload.action.queryHash);
            }
            break;
        }
      },
    };
  };
}

export { reactotronReactQuery };
