import { Action, Query } from 'react-query/types/core/query';
import { QueryObserver } from 'react-query/types/core/queryObserver';

interface NotifyEventQueryAdded {
  type: 'queryAdded';
  query: Query<any, any, any, any>;
}
interface NotifyEventQueryRemoved {
  type: 'queryRemoved';
  query: Query<any, any, any, any>;
}
interface NotifyEventQueryUpdated {
  type: 'queryUpdated';
  query: Query<any, any, any, any>;
  action: Action<any, any>;
}
interface NotifyEventObserverAdded {
  type: 'observerAdded';
  query: Query<any, any, any, any>;
  observer: QueryObserver<any, any, any, any, any>;
}
interface NotifyEventObserverRemoved {
  type: 'observerRemoved';
  query: Query<any, any, any, any>;
  observer: QueryObserver<any, any, any, any, any>;
}
interface NotifyEventObserverResultsUpdated {
  type: 'observerResultsUpdated';
  query: Query<any, any, any, any>;
}
export type QueryCacheNotifyEvent =
  | NotifyEventQueryAdded
  | NotifyEventQueryRemoved
  | NotifyEventQueryUpdated
  | NotifyEventObserverAdded
  | NotifyEventObserverRemoved
  | NotifyEventObserverResultsUpdated;
