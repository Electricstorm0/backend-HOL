const HOLUsersRepository = require('../HOLUsersRepository');

describe('HOL Users interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersHOLRepository = new HOLUsersRepository();

    // Action and Assert
    await expect(usersHOLRepository.readCountUsers(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.readCountUsersByProgram(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.create(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.update(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.delete(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.read(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.readById(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.readJourneyUsers(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.checkRegisteredUsersHOL(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersHOLRepository.readByUsersId(' ')).rejects.toThrowError('HOL_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
