import { broadcastReactQueryEvent, broadcastMutationEvent } from "./reactotron-helpers"
jest.mock("reactotron-core-client")
import { ReactotronCore } from "reactotron-core-client"

describe("broadcastReactQueryEvent", () => {
  const createReactotron = () => {
    return {
      stateActionComplete: jest.fn(),
      stateValuesResponse: jest.fn(),
      display: jest.fn(),
    }
  }

  it("can broadcast a queryUpdated event with isFetching=true", () => {
    const reactotron = createReactotron()
    const event = {
      type: "queryUpdated",
      query: {
        queryHash: "queryHash",
        state: {
          isFetching: false,
        },
      },
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    broadcastReactQueryEvent(reactotron, event)

    expect(reactotron.display).toHaveBeenCalledWith({
      name: `${event?.type}${event?.query.queryHash}`,
      value: event?.query,
    })
  })
  it("can broadcast a event that is not queryUpdated", () => {
    const reactotron = createReactotron()
    const event = {
      type: "event",
      query: {
        queryHash: "queryHash",
        state: {
          isFetching: true,
        },
      },
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    broadcastReactQueryEvent(reactotron, event)

    expect(reactotron.display).toHaveBeenCalledWith({
      name: `${event?.type}${event?.query.queryHash}`,
      value: event?.query,
    })
  })
})

describe("broadcastMutationEvent", () => {
  const createReactotron = (): ReactotronCore => {
    return {
      send: jest.fn(),
    } as unknown as ReactotronCore
  }

  it("should not broadcast when event type is in disableMutationTypes", () => {
    const reactotron = createReactotron()
    const event = {
      type: "observerOptionsUpdated",
      mutation: { id: "mutation1" },
    }

    // @ts-ignore
    broadcastMutationEvent(reactotron, event)

    expect(reactotron.send).not.toHaveBeenCalled()
  })

  it("should not broadcast if event is undefined", () => {
    const reactotron = createReactotron()

    // @ts-ignore
    broadcastMutationEvent(reactotron, undefined)

    expect(reactotron.send).not.toHaveBeenCalled()
  })

  it("should broadcast valid mutation event", () => {
    const reactotron = createReactotron()
    const event = {
      type: "mutationUpdated",
      mutation: { id: "mutation1", status: "success" },
    }

    // @ts-ignore
    broadcastMutationEvent(reactotron, event)

    expect(reactotron.send).toHaveBeenCalledWith("state.action.complete", {
      name: "mutation",
      action: {
        type: "mutationUpdated",
        mutation: { id: "mutation1", status: "success" },
      },
    })
  })

  it("should not broadcast if mutation is missing", () => {
    const reactotron = createReactotron()
    const event = {
      type: "mutationUpdated",
      mutation: undefined,
    }

    // @ts-ignore
    broadcastMutationEvent(reactotron, event)

    expect(reactotron.send).not.toHaveBeenCalled()
  })
})
