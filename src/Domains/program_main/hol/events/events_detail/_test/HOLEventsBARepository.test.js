const HOLEventsBARepository = require('../bonding_activities/HOLEventsBARepository');

describe('HOL Events Bonding Activities interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const eventsBARepository = new HOLEventsBARepository();

    // Action and Assert
    await expect(eventsBARepository.create(' ')).rejects.toThrowError('HOL_EVENTS_BONDING_ACTIVITIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsBARepository.update(' ')).rejects.toThrowError('HOL_EVENTS_BONDING_ACTIVITIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsBARepository.delete(' ')).rejects.toThrowError('HOL_EVENTS_BONDING_ACTIVITIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsBARepository.read(' ')).rejects.toThrowError('HOL_EVENTS_BONDING_ACTIVITIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsBARepository.readById(' ')).rejects.toThrowError('HOL_EVENTS_BONDING_ACTIVITIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
