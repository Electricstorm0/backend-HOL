const HOLGetUsersMeDetailUseCase = require('../HOLGetUsersMeDetailUseCase');
const HOLGetUsersMeDetail = require('../../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMeDetail');
const HOLGetUsersUniversities = require('../../../../../../Domains/program_main/hol/users/entities/HOLGetUsersUniversities');

describe('HOLGetUsersMeDetailUseCase', () => {
  it('should orchestrate the get users me detail correctly', async () => {
    // Arrange
    const mockUsersId = 123;
    const mockBatchId = 456;

    const mockUsersRepository = {
      readById: jest.fn().mockResolvedValue({ id_users: mockUsersId, email: 'test@example.com' }),
    };
    const mockUsersDetailRepository = {
      readById: jest.fn().mockResolvedValue({ first_name: 'John', last_name: 'Doe' }),
    };
    const mockUsersUniversitiesRepository = {
      readByUsersAndBatchId: jest.fn().mockResolvedValue({ id: 1, collage_year: 2020 }),
    };
    const mockHOLUsersRepository = {
      readByUsersId: jest.fn().mockResolvedValue({ batchId: mockBatchId }),
      readById: jest.fn().mockResolvedValue({ id_regencies: 1, id_lead_division_institutions: 5 }),
    };
    const mockGetProgramSecondTierByUsersAndBatch = {
      execute: jest.fn().mockResolvedValue({ secondTierProgramName: 'Program X' }),
    };
    const mockGetDomicilesUsersUseCase = {
      execute: jest.fn().mockResolvedValue('Jakarta Selatan'),
    };
    const mockGetUniversitiesUsersUseCase = {
      execute: jest.fn().mockResolvedValue({ universitiesName: 'Univ XYZ' }),
    };
    const mockLEADGetInstitutions = {
      execute: jest.fn().mockResolvedValue({ institutionsName: 'Instansi ABC' }),
    };
    const mockMasterRegenciesRepository = {
      readById: jest.fn().mockResolvedValue({ name: 'Jakarta' }),
    };

    const useCase = new HOLGetUsersMeDetailUseCase({
      usersRepository: mockUsersRepository,
      usersDetailRepository: mockUsersDetailRepository,
      usersUniversitiesRepository: mockUsersUniversitiesRepository,
      holUsersRepository: mockHOLUsersRepository,
      getProgramSecondTierByUsersAndBatch: mockGetProgramSecondTierByUsersAndBatch,
      getUniversitiesUsersUseCase: mockGetUniversitiesUsersUseCase,
      getDomicilesUsersUseCase: mockGetDomicilesUsersUseCase,
      lEADGetInstitutionsByDivisionInstitutionsUseCase: mockLEADGetInstitutions,
      masterRegenciesRepository: mockMasterRegenciesRepository,
    });

    // Act
    const result = await useCase.execute({ id: mockUsersId });

    // Assert
    expect(result).toBeInstanceOf(HOLGetUsersMeDetail);
    expect(result.usersId).toBe(mockUsersId);
    expect(result.universities).toHaveProperty('universitiesDetail');
    expect(result.universities).toMatchObject({
      usersUniverisitiesId: expect.any(Number),
      collageYear: expect.any(Number),
      universitiesDetail: expect.any(Object),
    });

    expect(result.regenciesUsersLocation).toBe('Jakarta');
    expect(result.domicile).toBe('Jakarta Selatan');
  });
});
