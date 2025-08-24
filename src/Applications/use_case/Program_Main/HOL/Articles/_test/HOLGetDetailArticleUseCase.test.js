jest.mock('../../../../../../Domains/program_main/hol/articles/entities/GetDetailArticle');
const HOLGetDetailArticleUseCase = require('../HOLGetDetailArticleUseCase');
const HOLGetDetailArticle = require('../../../../../../Domains/program_main/hol/articles/entities/GetDetailArticle');

describe('HOLGetDetailArticleUseCase', () => {
  it('should orchestrate the get detail article action correctly', async () => {
    const mockMasterHOLArticlesRepository = {
      readById: jest.fn().mockResolvedValue({
        penulis: 'santi',
        program: 'CLP',
        title: 'Artikel Hebat',
        abstract: 'Isi abstrak',
        url_file: 'https://file.com.pdf',
        citation: 'cite',
        link_citation: 'https://cite.link',
        updated_at: new Date('2024-01-01'),
        status: 'Approved',
      }),
    };

    HOLGetDetailArticle.mockImplementation((payload) => ({
      ...payload,
      fileUrl: payload.url_file,
      linkCitation: payload.link_citation,
      tanggal_publish: payload.updated_at,
    }));

    const useCase = new HOLGetDetailArticleUseCase({ masterHOLArticlesRepository: mockMasterHOLArticlesRepository });

    const result = await useCase.execute({ id: 'abc123' });

    expect(result).toHaveProperty('fileUrl', 'https://file.com.pdf');
  });
});
