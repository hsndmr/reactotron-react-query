import { ReactotronCore } from 'reactotron-core-client';

import invalidateReactQueryCommand from './invalidate-react-query-command';
import { QueryClientManager } from './query-client-manager';
import { broadcastReactQueryEvent } from './reactotron-helpers';

// fix types next release
type ReactotronReactQuery = (queryClientManager: any) => any;

function reactotronReactQuery(
  queryClientManager: QueryClientManager
): ReactotronReactQuery {
  return (reactotron: ReactotronCore) => {
    queryClientManager.subscribe((event) =>
      broadcastReactQueryEvent(reactotron, event)
    );

    reactotron.onCustomCommand(invalidateReactQueryCommand(queryClientManager));

    return {
      onCommand: ({ type, payload }: { type: string; payload?: any }) => {
        switch (type) {
          case 'state.action.dispatch':
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
