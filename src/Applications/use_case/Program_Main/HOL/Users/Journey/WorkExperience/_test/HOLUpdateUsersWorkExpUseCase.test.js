/* eslint-disable no-undef */
const HOLUpdateUsersWorkExpUseCase = require('../HOLUpdateUsersWorkExpUseCase');
const UpdateExp = require('../../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/UpdateWorkExperience');

jest.mock('../../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/UpdateWorkExperience');

describe('HOLUpdateUsersWorkExpUseCase', () => {
  const idParam = { id: 1 };
  const payload = {
    companyName: 'Google',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    position: 'Engineer',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should orchestrate the update process correctly', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    UpdateExp.mockImplementation((data) => data);

    const useCase = new HOLUpdateUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await useCase.execute(idParam, payload);

    expect(UpdateExp).toBeCalledWith(payload);
    expect(mockRepository.update).toBeCalledWith({
      id: idParam.id,
      payload,
    });
  });

  it('should throw error if entity validation fails', async () => {
    const mockRepository = {
      update: jest.fn(),
    };

    UpdateExp.mockImplementation(() => {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLUpdateUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await expect(useCase.execute(idParam, {})).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(mockRepository.update).not.toBeCalled();
  });

  it('should throw error if repository update fails', async () => {
    const mockRepository = {
      update: jest.fn().mockRejectedValue(new Error('DB error')),
    };

    UpdateExp.mockImplementation((data) => data);

    const useCase = new HOLUpdateUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await expect(useCase.execute(idParam, payload)).rejects.toThrow('DB error');
  });
});
