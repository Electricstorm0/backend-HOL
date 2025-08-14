const HOLUsersEventsRepository = require('../HOLUsersEventsRepository');

describe('HOL Users Events interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersEventsRepository = new HOLUsersEventsRepository();

    // Action and Assert
    await expect(usersEventsRepository.readCountUsersEventsByEventsId(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readCountUsersEventsByEventsTypeId(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.create(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.update(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.delete(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readByUsersIdAndStatus(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readByUsersId(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readCountUsersEventsGroupByProgram(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readCountUsersEventsByEventsIdAndStatus(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.updateAttendance(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readByUsersIdAndAttendance(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.readUsersEventsByEventsId(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.checkRegisteredUsersEvents(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersEventsRepository.updateStatusUsersEvents(' ')).rejects.toThrowError('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
