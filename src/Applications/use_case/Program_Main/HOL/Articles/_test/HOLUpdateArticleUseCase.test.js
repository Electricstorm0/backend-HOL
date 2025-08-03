/* eslint-disable no-undef */
const HOLUpdateArticleUseCase = require('../HOLUpdateArticleUseCase');
const HOLUpdateArticle = require('../../../../../../Domains/program_main/hol/articles/entities/UpdateArticle');

jest.mock('../../../../../../Domains/program_main/hol/articles/entities/UpdateArticle');

describe('HOLUpdateArticleUseCase', () => {
  it('should orchestrate the update article action correctly', async () => {
    // Arrange
    const mockMasterHOLArticlesRepository = {
      update: jest.fn().mockResolvedValue(),
    };

    const useCase = new HOLUpdateArticleUseCase({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
    });

    const articleId = { id: 'article-123' };
    const payload = {
      title: 'Updated Title',
      abstract: 'Updated Abstract',
      fileUrl: 'https://example.com/new-file.pdf',
      citation: 'Updated Citation',
      linkCitation: 'https://example.com/new-citation',
    };

    // Mock entity result
    const mockEntity = {
      title: payload.title,
      abstract: payload.abstract,
      url_file: payload.fileUrl,
      citation: payload.citation,
      link_citation: payload.linkCitation,
    };

    HOLUpdateArticle.mockImplementation(() => mockEntity);

    // Act
    await useCase.execute(articleId, payload);

    // Assert
    expect(HOLUpdateArticle).toBeCalledWith(payload);
    expect(mockMasterHOLArticlesRepository.update).toBeCalledWith({
      id: 'article-123',
      payload: mockEntity,
    });
  });

  it('should throw error if payload is invalid', async () => {
    jest.unmock('../../../../../../Domains/program_main/hol/articles/entities/UpdateArticle');
    const HOLUpdateArticleReal = require('../../../../../../Domains/program_main/hol/articles/entities/UpdateArticle');

    const mockMasterHOLArticlesRepository = {
      update: jest.fn(),
    };

    class UseCaseWithRealEntity extends HOLUpdateArticleUseCase {
      async execute(id, payload) {
        const updatearticle = new HOLUpdateArticleReal(payload);
        return this._masterHOLArticlesRepository.update({ id, payload: updatearticle });
      }
    }

    const useCase = new UseCaseWithRealEntity({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
    });

    const invalidPayload = {
      title: '', // ← kosong, akan gagal validasi
      abstract: 'Isi abstrak',
      fileUrl: 'url.pdf',
      citation: 'cite',
      linkCitation: 'link',
    };

    await expect(useCase.execute({ id: 'article-123' }, invalidPayload)).rejects.toThrow('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
