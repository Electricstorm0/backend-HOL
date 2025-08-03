/* eslint-disable no-undef */
const HOLUpdateUsersInvolvementsUseCase = require('../HOLUpdateUsersInvolvementsUseCase');
const UpdateInvolve = require('../../../../../../../../Domains/program_main/hol/users/journey/involvements/entities/UpdateInvolvements');

describe('HOLUpdateUsersInvolvementsUseCase', () => {
  const idParam = { id: 1 };
  const payload = {
    usersId: 101,
    holUsersEventsId: 999,
  };

  it('should call repository update with correct data (happy path)', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    const useCase = new HOLUpdateUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    await useCase.execute(idParam, payload);

    expect(mockRepository.update).toBeCalledWith({
      id: 1,
      payload: new UpdateInvolve(payload),
    });
  });

  it('should throw error if UpdateInvolve entity validation fails', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    const useCase = new HOLUpdateUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    const invalidPayload = {
      usersId: 101,
      // holUsersEventsId is missing
    };

    await expect(useCase.execute(idParam, invalidPayload)).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockRepository.update).not.toBeCalled();
  });

  it('should propagate error from repository update', async () => {
    const mockRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    const useCase = new HOLUpdateUsersInvolvementsUseCase({
      holUsersInvolvementsRepository: mockRepository,
    });

    await expect(useCase.execute(idParam, payload)).rejects.toThrow('DB error');
    expect(mockRepository.update).toBeCalled();
  });
});
