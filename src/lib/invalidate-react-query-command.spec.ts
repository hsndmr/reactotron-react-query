import invalidateReactQueryCommand from './invalidate-react-query-command';

const queryClientManagerMock = {
  invalidateQueries: jest.fn(),
};

describe('invalidateReactQueryCommand', () => {
  it('should invalidate query when queryKey is provided', () => {
    // Arrange
    const args = { queryKey: 'exampleQueryKey' };

    // Act
    const command = invalidateReactQueryCommand(queryClientManagerMock as any);
    command.handler(args);

    // Assertion
    expect(queryClientManagerMock.invalidateQueries).toHaveBeenCalledWith(
      'exampleQueryKey',
    );
  });

  it('should not invalidate query when queryKey is not provided', () => {
    // Act
    const command = invalidateReactQueryCommand(queryClientManagerMock as any);
    command.handler({} as any);

    // Assertion
    expect(queryClientManagerMock.invalidateQueries).toHaveBeenCalledWith(
      undefined,
    );
  });
});
