import { ArgType, CustomCommand } from 'reactotron-core-client';

import { QueryClientManager } from './query-client-manager';

export default function invalidateReactQueryCommand(
  queryClientManager: QueryClientManager
): CustomCommand<[{ name: 'queryKey'; type: ArgType.String }]> {
  return {
    command: 'invalidate-react-query',
    handler: (args) => {
      const { queryKey } = args ?? {};
      queryClientManager.invalidateQueries(queryKey);
    },
    title: 'Invalidate React Query',
    description:
      'Invalidate a query by key. If no key is provided, all queries will be invalidated.',
    args: [{ name: 'queryKey', type: ArgType.String }],
  };
}
