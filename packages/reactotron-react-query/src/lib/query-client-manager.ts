import { Query, QueryClient } from "@tanstack/react-query"

import { MutationEvent, QueryEvent } from "./query-cache-notify-event.interface"
import { QueryClientManagerOptions } from "./query-client-manager-options.interface"
export class QueryClientManager {
  queryClient: QueryClient

  queryCacheEvent: (() => void) | undefined

  mutationCacheEvent: (() => void) | undefined

  constructor(options: QueryClientManagerOptions) {
    this.queryClient = options.queryClient
  }

  getQueryCache() {
    return this.queryClient.getQueryCache()
  }

  getQueries(): Query[] {
    return this.getQueryCache().getAll()
  }

  getQueryByHash(queryHash: string): Query | undefined {
    return this.getQueries().find((query) => query.queryHash === queryHash)
  }

  fetchQueryByHash(queryHash: string) {
    return this.getQueryByHash(queryHash)?.fetch()
  }

  subscribe(
    callback: (event: QueryEvent | undefined) => void,
    mutationCallback: (event: MutationEvent | undefined) => void
  ) {
    this.queryCacheEvent = this.queryClient.getQueryCache().subscribe((_event) => {
      // @ts-expect-error - this is a valid event
      callback(_event)
    })

    this.mutationCacheEvent = this.queryClient.getMutationCache().subscribe((_event) => {
      // @ts-expect-error - this is a valid event
      mutationCallback(_event)
    })
  }

  unsubscribe() {
    if (this.queryCacheEvent) {
      this.queryCacheEvent()
      this.queryCacheEvent = undefined
    }
    if (this.mutationCacheEvent) {
      this.mutationCacheEvent()
      this.mutationCacheEvent = undefined
    }
  }

  invalidateQueries(key: string) {
    if (key === "") {
      return this.queryClient.invalidateQueries()
    }

    return this.queryClient.invalidateQueries({
      queryKey: [key],
    })
  }
}
