/* eslint-disable no-undef */
const HOLDeleteUsersInvolvementsUseCase = require('../HOLDeleteUsersInvolvementsUseCase');

describe('HOLDeleteUsersInvolvementsUseCase', () => {
  const idParam = { id: 123 };

  it('should call repository delete method with correct id and return result', async () => {
    const mockDeletedInvolve = { id: 123, usersEventsHOLId: 456, usersId: 789 };

    const mockRepository = {
      delete: jest.fn().mockResolvedValue(mockDeletedInvolve),
    };

    const useCase = new HOLDeleteUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.delete).toBeCalledWith({ id: 123 });
    expect(result).toEqual(mockDeletedInvolve);
  });

  it('should return undefined if repository returns undefined', async () => {
    const mockRepository = {
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new HOLDeleteUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.delete).toBeCalledWith({ id: 123 });
    expect(result).toBeUndefined();
  });
});
