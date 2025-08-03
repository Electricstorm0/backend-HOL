/* eslint-disable no-undef */
const HOLGetAllArticleUseCase = require('../HOLGetAllArticleUseCase');
const HOLGetPublications = require('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

jest.mock('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

describe('HOLGetAllArticleUseCase', () => {
  it('should orchestrate the get all articles correctly with pagination', async () => {
    // Arrange
    const mockMasterHOLArticlesRepository = {
      readCountArticle: jest.fn().mockResolvedValue(5), // total 5 artikel
      readAllByStatus: jest.fn().mockResolvedValue([
        {
          id: 1,
          penulis: 'santi',
          title: 'Judul Artikel',
          program: 'Program A',
          created_at: new Date('2024-01-01'),
          status: 'Approved',
        },
        {
          id: 2,
          penulis: 'susanti',
          title: 'Judul Artikel 2',
          program: 'Program B',
          created_at: new Date('2024-01-02'),
          status: 'Approved',
        },
      ]),
    };

    const useCase = new HOLGetAllArticleUseCase({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
    });

    // Mock class constructor to just return the input payload
    HOLGetPublications.mockImplementation((payload) => payload);

    const payload = {
      pageSize: 2,
      page: 2,
    };

    // Act
    const result = await useCase.execute(payload);

    // Assert
    expect(mockMasterHOLArticlesRepository.readCountArticle).toBeCalled();
    expect(mockMasterHOLArticlesRepository.readAllByStatus).toBeCalledWith({ skip: 2, numPerPage: 2 }); // (page - 1) * pageSize

    expect(result).toEqual({
      result: [
        {
          id: 1,
          penulis: 'santi',
          title: 'Judul Artikel',
          program: 'Program A',
          created_at: new Date('2024-01-01'),
          status: 'Approved',
        },
        {
          id: 2,
          penulis: 'susanti',
          title: 'Judul Artikel 2',
          program: 'Program B',
          created_at: new Date('2024-01-02'),
          status: 'Approved',
        },
      ],
      current: 1, // offset = page - 1 = 1
      perPage: 2,
      previous: 1, // page - 1 = 1
      next: 2, // karena hanya 5 data → 3 halaman max, offset = 1 sudah terakhir
    });
  });

  it('should return empty result if repository returns empty array', async () => {
    const mockMasterHOLArticlesRepository = {
      readCountArticle: jest.fn().mockResolvedValue(0),
      readAllByStatus: jest.fn().mockResolvedValue([]),
    };

    const useCase = new HOLGetAllArticleUseCase({
      masterHOLArticlesRepository: mockMasterHOLArticlesRepository,
    });

    HOLGetPublications.mockImplementation((payload) => payload);

    const result = await useCase.execute({ pageSize: 5, page: 1 });

    expect(result).toEqual({
      result: [],
      current: 0,
      perPage: 5,
      previous: undefined,
      next: undefined,
    });
  });
});
