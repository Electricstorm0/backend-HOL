const HOLGetUsersByIdUseCase = require('../HOLGetUsersByIdUseCase');
const HolGetUsers = require('../../../../../../Domains/program_main/hol/users/entities/HolGetUsers');

describe('HOLGetUsersByIdUseCase', () => {
  it('should orchestrate the get users by id use case correctly', async () => {
    // Arrange
    const mockId = 1;
    const mockUserData = {
      id: 100,
      id_users: 200,
      id_batch: 10,
      Alumni_Name: 'Putri Salsa',
      program: 'HOL',
      batch: 'Batch 9',
      domisili: 'Jakarta',
      recent_journey: 'Internship',
      musical_instrument: 'Terompet',
      talent: 'Bermain Terompet',
      talent_description_selected: 'Saya bisa main terompet',
      bcf_activites: 'Volunteer',
      other_activites: 'Organisasi',
      five_year_award: 'Juara Nasional',
      five_year_plan: 'S2 di LN',
      five_year_plan_description: 'Ingin kuliah S2 di Amerika',
      ability: 'Musik',
      ability_description_selected: 'Menguasai musik',
      ability_award_selected: 'Juara solo terompet',
      achievement_last_three_years: 'Mahasiswa berprestasi',
      activities_outside_college_and_internship: 'Aktif organisasi',
      have_a_business: 1,
      joined_social_communities: 'Yes',
    };

    const expectedResult = new HolGetUsers({
      photoProfile: 'profileKu.JPG',
      ...mockUserData,
    });

    const mockHolUsersRepository = {
      readById: jest.fn().mockResolvedValue(mockUserData),
    };

    const useCase = new HOLGetUsersByIdUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute({ id: mockId });

    // Assert
    expect(mockHolUsersRepository.readById).toBeCalledWith({ id: mockId });
    expect(result).toBeInstanceOf(HolGetUsers);
    expect(result).toEqual(expectedResult);
  });

  it('should return default profile photo even if user data is empty', async () => {
    // Arrange
    const mockHolUsersRepository = {
      readById: jest.fn().mockResolvedValue({}),
    };

    const useCase = new HOLGetUsersByIdUseCase({
      holUsersRepository: mockHolUsersRepository,
    });

    // Act
    const result = await useCase.execute({ id: 1 });

    // Assert
    expect(result.photoProfile).toBe('profileKu.JPG');
    expect(result).toBeInstanceOf(HolGetUsers);
  });
});
