import { Query, QueryClient } from "react-query";
import { QueryClientManagerOptions } from "./query-client-manager-options.interface";
import { QueryCacheNotifyEvent } from "./query-cache-notify-event.interface";
export class QueryClientManager {
  queryClient: QueryClient;

  queryCacheEvent: (() => void) | undefined;

  constructor(options: QueryClientManagerOptions) {
    this.queryClient = options.queryClient;
  }

  getQueryCache() {
    return this.queryClient.getQueryCache();
  }

  getQueries(): Query[] {
    return this.getQueryCache().getAll();
  }

  getQueryByHash(queryHash: string): Query | undefined {
    return this.getQueries().find((query) => query.queryHash === queryHash);
  }

  fetchQueryByHash(queryHash: string) {
    return this.getQueryByHash(queryHash)?.fetch();
  }

  subscribe(callback: (event: QueryCacheNotifyEvent | undefined) => void) {
    this.queryCacheEvent = this.queryClient
      .getQueryCache()
      .subscribe((_event) => {
        callback(_event);
      });
  }

  unsubscribe() {
    if (this.queryCacheEvent) {
      this.queryCacheEvent();
      this.queryCacheEvent = undefined;
    }
  }
}
