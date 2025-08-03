const HOLUsersInvolvementsRepository = require('../involvements/HOLUsersInvolvementsRepository');

describe('HOL Users Involvements Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersInvolvementsRepository = new HOLUsersInvolvementsRepository();

    // Action and Assert
    await expect(usersInvolvementsRepository.create(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersInvolvementsRepository.update(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersInvolvementsRepository.delete(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersInvolvementsRepository.read(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersInvolvementsRepository.readById(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersInvolvementsRepository.readByUsersEventsId(' ')).rejects.toThrowError('HOL_USERS_INVOLVEMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
