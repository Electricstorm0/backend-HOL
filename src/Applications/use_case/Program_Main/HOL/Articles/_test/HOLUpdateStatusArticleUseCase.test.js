/* eslint-disable no-undef */
const HOLUpdateStatusArticleUseCase = require('../HOLUpdateStatusArticleUseCase');

describe('HOLUpdateStatusArticleUseCase', () => {
  it('should orchestrate the update status action correctly', async () => {
    // Arrange
    const mockHolUsersArticlesRepository = {
      updateStatusArticle: jest.fn().mockResolvedValue({
        id: 'article-123',
        status: 'Approved',
      }),
    };

    const useCase = new HOLUpdateStatusArticleUseCase({
      holUsersArticlesRepository: mockHolUsersArticlesRepository,
    });

    const id = { id: 'article-123' };
    const payload = { status: 'Approved' };

    // Act
    const result = await useCase.execute(id, payload);

    // Assert
    expect(mockHolUsersArticlesRepository.updateStatusArticle).toBeCalledWith({ id: 'article-123', status: 'Approved' });
    expect(result).toEqual({
      id: 'article-123',
      status: 'Approved',
    });
  });
});
