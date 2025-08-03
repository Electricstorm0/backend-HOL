const HOLEventsRepository = require('../HOLEventsRepository');

describe('HOL Events interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const eventsRepository = new HOLEventsRepository();

    // Action and Assert
    await expect(eventsRepository.create(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.update(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.delete(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.read(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.readById(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.readEventsTypeAndPositionByEventsId(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsRepository.readCountByProgramType(' ')).rejects.toThrowError('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
