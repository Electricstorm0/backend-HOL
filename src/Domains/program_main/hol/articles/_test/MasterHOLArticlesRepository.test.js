const MasterHOLArticlesRepository = require('../MasterHOLArticlesRepository');

describe('Articles interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const masterArticlesRepository = new MasterHOLArticlesRepository();

    // Action and Assert
    await expect(masterArticlesRepository.readCountArticle(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.create(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.update(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.delete(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.read(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.readById(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(masterArticlesRepository.readAllByStatus(' ')).rejects.toThrowError('MASTER_HOL_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
