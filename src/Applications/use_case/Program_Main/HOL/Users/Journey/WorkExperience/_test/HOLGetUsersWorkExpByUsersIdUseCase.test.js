/* eslint-disable no-undef */
const HOLGetUsersWorkExpByUsersIdUseCase = require('../HOLGetUsersWorkExpByUsersIdUseCase');
const GetExp = require('../../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/GetWorkExperience');

jest.mock('../../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/GetWorkExperience');

describe('HOLGetUsersWorkExpByUsersIdUseCase', () => {
  const userIdParam = { id: 101 };

  const dummyData = [
    {
      id: 1,
      id_users_hol: 101,
      company_name: 'Google',
      start_date: '2022-01-01',
      end_date: '2022-12-31',
      position: 'Software Engineer',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted user work experience data', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue(dummyData),
    };

    GetExp.mockImplementation((payload) => payload); // bypass entity validation

    const useCase = new HOLGetUsersWorkExpByUsersIdUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    const result = await useCase.execute(userIdParam);

    expect(mockRepository.readByUsersId).toBeCalledWith({ usersHOLId: 101 });
    expect(result).toEqual(dummyData);
  });

  it('should return empty array if repository returns null', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue(null),
    };

    GetExp.mockImplementation((payload) => payload);

    const useCase = new HOLGetUsersWorkExpByUsersIdUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    const result = await useCase.execute(userIdParam);

    expect(result).toEqual([]);
  });

  it('should throw error if entity validation fails', async () => {
    const mockRepository = {
      readByUsersId: jest.fn().mockResolvedValue([{ company_name: null }]), // invalid data
    };

    GetExp.mockImplementation(() => {
      throw new Error('GET_WORK_EXP.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    const useCase = new HOLGetUsersWorkExpByUsersIdUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await expect(useCase.execute(userIdParam)).rejects.toThrow('GET_WORK_EXP.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
