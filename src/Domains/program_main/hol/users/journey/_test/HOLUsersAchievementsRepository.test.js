const HOLUsersAchievementsRepository = require('../achievements/HOLUsersAchievementsRepository');

describe('HOL Users Achievements Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersAchievementsRepository = new HOLUsersAchievementsRepository();

    // Action and Assert
    await expect(usersAchievementsRepository.create(' ')).rejects.toThrowError('HOL_USERS_ACHIEVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersAchievementsRepository.update(' ')).rejects.toThrowError('HOL_USERS_ACHIEVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersAchievementsRepository.delete(' ')).rejects.toThrowError('HOL_USERS_ACHIEVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersAchievementsRepository.readByUsersId(' ')).rejects.toThrowError('HOL_USERS_ACHIEVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
