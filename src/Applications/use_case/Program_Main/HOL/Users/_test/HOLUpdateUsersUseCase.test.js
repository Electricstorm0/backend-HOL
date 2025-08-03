const UpdateUsersUseCase = require('../HOLUpdateUsersUseCase');
const UpdateUsersDetail = require('../../../../../../Domains/users/entities/UpdateUsersDetail');
const HOLUpdateUsers = require('../../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsers');
const HOLUpdateUsersDomicile = require('../../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsersDomicile');
const HOLUpdateUsersUniversities = require('../../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsersUniversities');

describe('UpdateUsersUseCase', () => {
  it('should orchestrate updating user data correctly', async () => {
    // Arrange
    const mockUsersDetailRepository = {
      update: jest.fn(),
    };
    const mockHOLUsersRepository = {
      update: jest.fn(),
    };
    const mockUsersDomicileRepository = {
      update: jest.fn(),
    };
    const mockUsersUniversitiesRepository = {
      update: jest.fn(),
    };

    const useCase = new UpdateUsersUseCase({
      holUsersRepository: mockHOLUsersRepository,
      usersDetailRepository: mockUsersDetailRepository,
      usersDomicileRepository: mockUsersDomicileRepository,
      usersUniversitiesRepository: mockUsersUniversitiesRepository,
    });

    const usersId = 123;
    const payload = {
      usersHOLId: 456,
      usersDomicileId: 789,
      usersUniversitiesId: 1011,
      first_name: 'putri',
      last_name: 'salsa',
      phone_number: '0812937394876',
      id_card_number: '31729875735471',
      musicalInstrument: 'terompet',
      talent: 'bermain terompet',
      taletDescriptionSelected: 'saya bisa main terompet',
      bcfActivities: 'internship',
      otherActivities: 'tidak ada',
      fiveYearAward: 'juara 1 lomba terompet internasional',
      fiveYearPlan: 'lanjut pendidikan s2',
      fiveYearPlanDescription: 'saya ingin melanjutkan s2 di amerika',
      ability: 'bermain musik',
      abilityDescriptionSelected: 'saya menguasai seni musik',
      abilityAwardSelected: 'juara 1 solo terompet internasional',
      achievementsLastThreeYears: 'menjadi mahasiswa berprestasi',
      activitiesOutside: 'berorganisasi',
      haveABussiness: 1,
      joinedSocialCommunities: 'iyaa',
      completeAddress: 'jl.rahwana putra no 5',
      regenciesId: 19,
      provinceId: 11,
      universitiesMajorId: 2,
      collageYear: '2021',
    };

    // Act
    await useCase.execute({ id: usersId }, payload);

    // Assert
    expect(mockUsersDetailRepository.update).toBeCalledWith({
      id: usersId,
      payload: expect.any(UpdateUsersDetail),
    });

    expect(mockHOLUsersRepository.update).toBeCalledWith({
      id: 456,
      payload: expect.any(HOLUpdateUsers),
    });

    expect(mockUsersDomicileRepository.update).toBeCalledWith({
      id: 789,
      payload: expect.any(HOLUpdateUsersDomicile),
    });

    expect(mockUsersUniversitiesRepository.update).toBeCalledWith({
      id: 1011,
      payload: expect.any(HOLUpdateUsersUniversities),
    });
  });
});
