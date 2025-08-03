/* eslint-disable no-undef */

const HOLCreateArticlesUseCase = require('../HOLCreateArticlesUseCase');

describe('HOLCreateArticlesUseCase', () => {
  it('should orchestrate the create article action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Judul Artikel',
      abstract: 'Ini abstrak artikel.',
      fileUrl: 'https://file.com/artikel.pdf',
      citation: 'Citations',
      linkCitation: 'https://citation.com',
    };

    const authUser = {
      id: 'user-hol-123',
    };

    const mockMasterHOLArticlesRepository = {
      create: jest.fn().mockResolvedValue('article-789'),
    };

    const mockHOLUsersArticlesRepository = {
      create: jest.fn().mockResolvedValue(),
    };

    const useCase = new HOLCreateArticlesUseCase({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
      holUsersArticlesRepository: mockHOLUsersArticlesRepository,
    });

    // Act
    await useCase.execute(authUser, useCasePayload);

    // Assert
    expect(mockMasterHOLArticlesRepository.create).toBeCalledWith({
      title: useCasePayload.title,
      abstract: useCasePayload.abstract,
      fileUrl: useCasePayload.fileUrl,
      citation: useCasePayload.citation,
      linkCitation: useCasePayload.linkCitation,
    });

    expect(mockHOLUsersArticlesRepository.create).toBeCalledWith({
      articleId: 'article-789',
      usersHOLId: 'user-hol-123',
      status: 'Checking',
    });
  });
});
