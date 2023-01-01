import { ReactotronCore } from "reactotron-core-client";
import { QueryCacheNotifyEvent } from "./query-cache-notify-event.interface";

export const broadcastReactQueryEvent = (
  reactotron: ReactotronCore,
  event: QueryCacheNotifyEvent | undefined
) => {
  if (event?.type === "queryUpdated" && !event.query.state.isFetching) {
    reactotron.stateActionComplete &&
      reactotron.stateActionComplete(event.query.queryHash, {
        queryHash: event.query.queryHash,
      });

    reactotron.stateValuesResponse &&
      reactotron.stateValuesResponse(event.query.queryHash, event.query.state);
  }

  reactotron.display({
    name: `${event?.type}${event?.query.queryHash}`,
    value: event?.query,
  });
};
