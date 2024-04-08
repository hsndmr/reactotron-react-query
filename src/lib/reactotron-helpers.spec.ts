import { broadcastReactQueryEvent } from './reactotron-helpers';
jest.mock('reactotron-core-client');

describe('broadcastReactQueryEvent', () => {
  const createReactotron = () => {
    return {
      stateActionComplete: jest.fn(),
      stateValuesResponse: jest.fn(),
      display: jest.fn(),
    };
  };

  it('can broadcast a queryUpdated event with isFetching=true', () => {
    const reactotron = createReactotron();
    const event = {
      type: 'queryUpdated',
      query: {
        queryHash: 'queryHash',
        state: {
          isFetching: false,
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    broadcastReactQueryEvent(reactotron, event);

    expect(reactotron.display).toHaveBeenCalledWith({
      name: `${event?.type}${event?.query.queryHash}`,
      value: event?.query,
    });
  });
  it('can broadcast a event that is not queryUpdated', () => {
    const reactotron = createReactotron();
    const event = {
      type: 'event',
      query: {
        queryHash: 'queryHash',
        state: {
          isFetching: true,
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    broadcastReactQueryEvent(reactotron, event);

    expect(reactotron.display).toHaveBeenCalledWith({
      name: `${event?.type}${event?.query.queryHash}`,
      value: event?.query,
    });
  });
});
