const MasterHOLAreaRepository = require('../MasterHOLAreaRepository');

describe('HOL Area interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const masterHOLAreaRepository = new MasterHOLAreaRepository();

    // Action and Assert
    await expect(masterHOLAreaRepository.create(' ')).rejects.toThrowError('MASTER_HOL_AREA_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterHOLAreaRepository.update(' ')).rejects.toThrowError('MASTER_HOL_AREA_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterHOLAreaRepository.delete(' ')).rejects.toThrowError('MASTER_HOL_AREA_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterHOLAreaRepository.read(' ')).rejects.toThrowError('MASTER_HOL_AREA_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterHOLAreaRepository.readById(' ')).rejects.toThrowError('MASTER_HOL_AREA_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
