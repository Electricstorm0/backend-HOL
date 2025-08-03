const HOLMasterEventsTypeRepository = require('../HOLMasterEventsTypeRepository');

describe('HOL Events Type interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const eventsTypeRepository = new HOLMasterEventsTypeRepository();

    // Action and Assert
    await expect(eventsTypeRepository.create(' ')).rejects.toThrowError('HOL_MASTER_EVENTS_TYPE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsTypeRepository.update(' ')).rejects.toThrowError('HOL_MASTER_EVENTS_TYPE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsTypeRepository.delete(' ')).rejects.toThrowError('HOL_MASTER_EVENTS_TYPE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsTypeRepository.read(' ')).rejects.toThrowError('HOL_MASTER_EVENTS_TYPE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(eventsTypeRepository.readById(' ')).rejects.toThrowError('HOL_MASTER_EVENTS_TYPE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
