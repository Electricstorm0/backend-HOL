/* eslint-disable no-undef */
const HOLDeleteArticleUseCase = require('../HOLDeleteArticleUseCase');

describe('HOLDeleteArticleUseCase', () => {
  it('should orchestrate the delete article action correctly', async () => {
    // Arrange
    const mockMasterHOLArticlesRepository = {
      delete: jest.fn().mockResolvedValue({
        message: 'Article deleted successfully',
        id: 'article-123',
      }),
    };

    const useCase = new HOLDeleteArticleUseCase({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
    });

    const input = { id: 'article-123' };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(mockMasterHOLArticlesRepository.delete).toBeCalledWith({ id: 'article-123' });
    expect(result).toEqual({
      message: 'Article deleted successfully',
      id: 'article-123',
    });
  });
});
