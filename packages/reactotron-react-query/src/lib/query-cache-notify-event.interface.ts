import { Mutation, Query } from "@tanstack/react-query"
import { QueryObserver } from "@tanstack/react-query"

interface NotifyEventQueryAdded {
  type: "queryAdded"
  query: Query
  mutation: undefined
}
interface NotifyEventQueryRemoved {
  type: "queryRemoved"
  query: Query
  mutation: undefined
}
interface NotifyEventQueryUpdated {
  type: "queryUpdated"
  query: Query
  mutation: undefined
}
interface NotifyEventObserverAdded {
  type: "observerAdded"
  query: Query
  observer: QueryObserver
  mutation: undefined
}
interface NotifyEventObserverRemoved {
  type: "observerRemoved"
  query: Query
  observer: QueryObserver
  mutation: undefined
}
interface NotifyEventObserverResultsUpdated {
  type: "observerResultsUpdated"
  query: Query
  mutation: undefined
}
interface NotifyEventObserverOptionsUpdated {
  type: "observerOptionsUpdated"
  query: Query
  mutation: undefined
}

interface NotifyEventMutationAdded {
  type: "mutationAdded"
  mutation: Mutation
  query: undefined
}
interface NotifyEventMutationRemoved {
  type: "mutationRemoved"
  mutation: Mutation
  query: undefined
}
interface NotifyEventMutationUpdated {
  type: "mutationUpdated"
  mutation: Mutation
  query: undefined
}

export type QueryEvent =
  | NotifyEventObserverOptionsUpdated
  | NotifyEventQueryAdded
  | NotifyEventQueryRemoved
  | NotifyEventQueryUpdated
  | NotifyEventObserverAdded
  | NotifyEventObserverRemoved
  | NotifyEventObserverResultsUpdated

export type MutationEvent = NotifyEventMutationAdded | NotifyEventMutationRemoved | NotifyEventMutationUpdated
