const HOLUsersArticlesRepository = require('../HOLUsersArticlesRepository');

describe('usersArticles interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const usersArticlesRepository = new HOLUsersArticlesRepository();

    // Action and Assert
    await expect(usersArticlesRepository.readCountUsersArticle(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.readCountArticlesByUsersId(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.create(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.updateStatusArticle(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.delete(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.read(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.readById(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(usersArticlesRepository.readByUsersId(' ')).rejects.toThrowError('HOL_USERS_ARTICLES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
