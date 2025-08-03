/* eslint-disable no-undef */
const DeleteBAUseCase = require('../HOLDeleteBAUseCase');

describe('DeleteBAUseCase', () => {
  const id = { id: 'event-123' };

  it('should orchestrate the delete bonding activity correctly (happy path)', async () => {
    // Arrange
    const mockHolEventsRepository = {
      delete: jest.fn().mockResolvedValue({ id: 'event-123', message: 'deleted' }),
    };

    const useCase = new DeleteBAUseCase({ holEventsRepository: mockHolEventsRepository });

    // Act
    const result = await useCase.execute(id);

    // Assert
    expect(mockHolEventsRepository.delete).toBeCalledWith({ id: 'event-123' });
    expect(result).toEqual({ id: 'event-123', message: 'deleted' });
  });

  it('should propagate error when repository throws', async () => {
    // Arrange
    const mockHolEventsRepository = {
      delete: jest.fn().mockRejectedValue(new Error('Delete failed')),
    };

    const useCase = new DeleteBAUseCase({ holEventsRepository: mockHolEventsRepository });

    // Act & Assert
    await expect(useCase.execute(id)).rejects.toThrow('Delete failed');
    expect(mockHolEventsRepository.delete).toBeCalledWith({ id: 'event-123' });
  });
});
