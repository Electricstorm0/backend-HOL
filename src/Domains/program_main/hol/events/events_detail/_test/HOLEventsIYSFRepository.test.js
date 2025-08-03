const HOLEventsIYSFRepository = require('../iysf/HOLEventsIYSFRepository');

describe('HOL Events IYSF interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const eventsIYSFRepository = new HOLEventsIYSFRepository();

    // Action and Assert
    await expect(eventsIYSFRepository.create(' ')).rejects.toThrowError('HOL_EVENTS_IYSF_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsIYSFRepository.update(' ')).rejects.toThrowError('HOL_EVENTS_IYSF_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsIYSFRepository.delete(' ')).rejects.toThrowError('HOL_EVENTS_IYSF_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsIYSFRepository.read(' ')).rejects.toThrowError('HOL_EVENTS_IYSF_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsIYSFRepository.readById(' ')).rejects.toThrowError('HOL_EVENTS_IYSF_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
