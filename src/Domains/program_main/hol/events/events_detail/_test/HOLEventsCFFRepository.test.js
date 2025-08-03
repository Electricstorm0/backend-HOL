const HOLEventsCFFRepository = require('../call_for_fellows/HOLEventsCFFRepository');

describe('HOL Events Call For Fellows interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const eventsCFFRepository = new HOLEventsCFFRepository();

    // Action and Assert
    await expect(eventsCFFRepository.create(' ')).rejects.toThrowError('HOL_EVENTS_CALL_FOR_FELLOWS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsCFFRepository.update(' ')).rejects.toThrowError('HOL_EVENTS_CALL_FOR_FELLOWS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsCFFRepository.delete(' ')).rejects.toThrowError('HOL_EVENTS_CALL_FOR_FELLOWS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsCFFRepository.read(' ')).rejects.toThrowError('HOL_EVENTS_CALL_FOR_FELLOWS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsCFFRepository.readById(' ')).rejects.toThrowError('HOL_EVENTS_CALL_FOR_FELLOWS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
