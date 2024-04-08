import { ReactotronCore } from 'reactotron-core-client';

import { QueryCacheNotifyEvent } from './query-cache-notify-event.interface';

export const broadcastReactQueryEvent = (
  reactotron: ReactotronCore,
  event: QueryCacheNotifyEvent | undefined
) => {
  reactotron.display({
    name: `${event?.type}${event?.query.queryHash}`,
    value: event?.query,
  });
};
