/* eslint-disable no-undef */
const HOLGetAllMyArticleUseCase = require('../HOLGetAllMyArticleUseCase');
const HOLGetPublications = require('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

jest.mock('../../../../../../Domains/program_main/hol/articles/entities/GetPublications');

describe('HOLGetAllMyArticleUseCase', () => {
  it("should orchestrate getting user's own articles correctly", async () => {
    // Arrange
    const usersHOLId = 'user-123';
    const fakeArticleData = [
      {
        id: 1,
        penulis: 'santi',
        title: 'Artikel 1',
        program: 'Program A',
        created_at: new Date('2024-01-01'),
        status: 'Approved',
      },
      {
        id: 2,
        penulis: 'santi',
        title: 'Artikel 2',
        program: 'Program B',
        created_at: new Date('2024-01-02'),
        status: 'Checking',
      },
    ];

    const fakeCount = {
      total: 2,
      approved: 1,
      checking: 1,
    };

    const mockHolUsersArticlesRepository = {
      readCountArticlesByUsersId: jest.fn().mockResolvedValue(fakeCount),
      readByUsersId: jest.fn().mockResolvedValue(fakeArticleData),
    };

    // Mock entity constructor to return as-is (skip validation)
    HOLGetPublications.mockImplementation((payload) => payload);

    const useCase = new HOLGetAllMyArticleUseCase({
      holUsersArticlesRepository: mockHolUsersArticlesRepository,
    });

    // Act
    const result = await useCase.execute({ id: usersHOLId });

    // Assert
    expect(mockHolUsersArticlesRepository.readCountArticlesByUsersId).toBeCalledWith({ usersHOLId });
    expect(mockHolUsersArticlesRepository.readByUsersId).toBeCalledWith({ usersHOLId });

    expect(result).toEqual({
      total: 2,
      approved: 1,
      checking: 1,
      result: fakeArticleData, // karena entity dimock
    });
  });

  it('should return empty result if user has no articles', async () => {
    const usersHOLId = 'user-empty';

    const mockHolUsersArticlesRepository = {
      readCountArticlesByUsersId: jest.fn().mockResolvedValue({
        total: 0,
        approved: 0,
        checking: 0,
      }),
      readByUsersId: jest.fn().mockResolvedValue([]),
    };

    HOLGetPublications.mockImplementation((payload) => payload);

    const useCase = new HOLGetAllMyArticleUseCase({
      holUsersArticlesRepository: mockHolUsersArticlesRepository,
    });

    const result = await useCase.execute({ id: usersHOLId });

    expect(result).toEqual({
      total: 0,
      approved: 0,
      checking: 0,
      result: [],
    });
  });
});
