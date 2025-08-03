/* eslint-disable no-undef */
const HOLDeleteUsersWorkExpUseCase = require('../HOLDeleteUsersWorkExpUseCase');

describe('HOLDeleteUsersWorkExpUseCase', () => {
  const idParam = { id: 123 };

  it('should call repository delete and return the result (happy path)', async () => {
    const mockRepository = {
      delete: jest.fn().mockResolvedValue({ success: true }),
    };

    const useCase = new HOLDeleteUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    const result = await useCase.execute(idParam);

    expect(mockRepository.delete).toBeCalledWith({ id: 123 });
    expect(result).toEqual({ success: true });
  });

  it('should throw error if repository.delete fails', async () => {
    const mockRepository = {
      delete: jest.fn().mockRejectedValue(new Error('Delete error')),
    };

    const useCase = new HOLDeleteUsersWorkExpUseCase({
      holUsersWorkExpRepository: mockRepository,
    });

    await expect(useCase.execute(idParam)).rejects.toThrow('Delete error');
  });
});
