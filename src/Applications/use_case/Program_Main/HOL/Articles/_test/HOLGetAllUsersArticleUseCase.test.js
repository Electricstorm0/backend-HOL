/* eslint-disable no-undef */
const HOLGetAllUsersArticleUseCase = require('../HOLGetAllUsersArticleUseCase');
const HOLGetPublications = require('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

jest.mock('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

describe('HOLGetAllUsersArticleUseCase', () => {
  it('should orchestrate get all user articles correctly with pagination', async () => {
    // Arrange
    const mockHolUsersArticlesRepository = {
      readCountUsersArticle: jest.fn().mockResolvedValue(5),
      read: jest.fn().mockResolvedValue([
        {
          id: 1,
          penulis: 'User A',
          title: 'Artikel A',
          program: 'Program X',
          created_at: new Date('2024-01-01'),
          status: 'Approved',
        },
        {
          id: 2,
          penulis: 'User B',
          title: 'Artikel B',
          program: 'Program Y',
          created_at: new Date('2024-01-02'),
          status: 'Checking',
        },
      ]),
    };

    HOLGetPublications.mockImplementation((payload) => payload);

    const useCase = new HOLGetAllUsersArticleUseCase({
      holUsersArticlesRepository: mockHolUsersArticlesRepository,
    });

    const input = { pageSize: 2, page: 2 };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(mockHolUsersArticlesRepository.readCountUsersArticle).toBeCalled();
    expect(mockHolUsersArticlesRepository.read).toBeCalledWith({ skip: 2, numPerPage: 2 });

    expect(result).toEqual({
      result: [
        {
          id: 1,
          penulis: 'User A',
          title: 'Artikel A',
          program: 'Program X',
          created_at: new Date('2024-01-01'),
          status: 'Approved',
        },
        {
          id: 2,
          penulis: 'User B',
          title: 'Artikel B',
          program: 'Program Y',
          created_at: new Date('2024-01-02'),
          status: 'Checking',
        },
      ],
      current: 1,
      perPage: 2,
      previous: 1,
      next: 2, // karena offset 1 < numPages - 1
    });
  });

  it('should return empty result if repository returns no article', async () => {
    const mockHolUsersArticlesRepository = {
      readCountUsersArticle: jest.fn().mockResolvedValue(0),
      read: jest.fn().mockResolvedValue([]),
    };

    HOLGetPublications.mockImplementation((payload) => payload);

    const useCase = new HOLGetAllUsersArticleUseCase({
      holUsersArticlesRepository: mockHolUsersArticlesRepository,
    });

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
