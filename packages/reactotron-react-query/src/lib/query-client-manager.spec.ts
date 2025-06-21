import { QueryClient } from "@tanstack/react-query"

import { QueryClientManager } from "./query-client-manager"

let eventCacheListener: (() => void) | undefined
let eventMutationListener: (() => void) | undefined
jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query")
  const queryClientMock = class QueryClientMock {
    eventListener: undefined
    getQueryCache() {
      return {
        subscribe(callback: () => undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          eventCacheListener = callback
          return () => {
            eventCacheListener = undefined
          }
        },
        getAll() {
          return [
            {
              queryHash: "queryHash",
              fetch() {
                return "fetch"
              },
            },
          ]
        },
      }
    }
    getMutationCache() {
      return {
        subscribe(callback: () => undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          eventMutationListener = callback
          return () => {
            eventMutationListener = undefined
          }
        },
        getAll() {
          return [
            {
              queryHash: "queryHash",
              fetch() {
                return "fetch"
              },
            },
          ]
        },
      }
    }
  }

  return {
    __esModule: true,
    ...originalModule,
    QueryClient: queryClientMock,
  }
})

describe("QueryClientManager", () => {
  const queryClient = new QueryClient()
  const queryClientManager = new QueryClientManager({
    queryClient,
  })

  it("can have queries", () => {
    expect(1).toBe(queryClientManager.getQueries().length)
  })

  it("can find a query by hash", () => {
    expect(queryClientManager.getQueryByHash("queryHash")).toBeDefined()
  })

  it("can fetch a query by hash", () => {
    expect(queryClientManager.fetchQueryByHash("queryHash")).toBe("fetch")
  })

  it("can subscribe to query cache events", () => {
    const callback = jest.fn()
    queryClientManager.subscribe(callback, callback)

    eventCacheListener && eventCacheListener()
    eventCacheListener && eventCacheListener()

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("can unsubscribe from query cache events", () => {
    const callback = jest.fn()
    queryClientManager.subscribe(callback, callback)

    queryClientManager.unsubscribe()

    expect(queryClientManager.queryCacheEvent).toBeUndefined()
  })

  it("can invalidate queries", () => {
    // Arrange
    queryClient.invalidateQueries = jest.fn()
    queryClientManager.invalidateQueries("key")

    // Act & Assert
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["key"],
    })
  })

  it("can invalidate all queries", () => {
    // Arrange
    queryClient.invalidateQueries = jest.fn()
    queryClientManager.invalidateQueries("")

    // Act & Assert
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith()
  })
})
