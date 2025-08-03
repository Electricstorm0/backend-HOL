const HOLGetUsersMeUseCase = require('../HOLGetUsersMeUseCase');
const HOLGetUsersMe = require('../../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMe');
const GetMasterBatch = require('../../../../../../Domains/batch/entities/GetMasterBatch');
const GetMasterProgramRole = require('../../../../../../Domains/program/entities/GetMasterProgramRole');

describe('HOLGetUsersMeUseCase', () => {
  it('should orchestrate the get users me correctly', async () => {
    // Arrange
    const mockUsersId = 123;
    const mockUsersDetailRepository = {
      readById: jest.fn().mockResolvedValue({
        first_name: 'Putri',
        last_name: 'Salsa',
      }),
    };

    const mockOfferedProgramRepository = {
      readByUsersId: jest.fn().mockResolvedValue([
        { id_batch: 1, id_role: 2 },
        { id_batch: 3, id_role: 4 },
      ]),
    };

    const mockMasterBatchRepository = {
      readById: jest.fn().mockImplementation(({ id }) =>
        Promise.resolve({
          id,
          batch: `Batch ${id}`,
          date_start: '2024-01-01',
          date_end: '2024-12-31',
        })
      ),
      verifyCurrentlyActiveById: jest.fn().mockImplementation(
        ({ id }) => Promise.resolve(id === 1) // Only batch 1 is active
      ),
    };

    const mockMasterProgramRoleRepository = {
      readById: jest.fn().mockImplementation(({ id }) =>
        Promise.resolve({
          id,
          role: `Role ${id}`,
        })
      ),
    };

    const useCase = new HOLGetUsersMeUseCase({
      usersDetailRepository: mockUsersDetailRepository,
      offeredProgramRepository: mockOfferedProgramRepository,
      masterBatchRepository: mockMasterBatchRepository,
      masterProgramRoleRepository: mockMasterProgramRoleRepository,
    });

    // Act
    const result = await useCase.execute({ id: mockUsersId });

    // Assert
    expect(result).toBeInstanceOf(HOLGetUsersMe);
    expect(result.firstName).toBe('Putri');
    expect(result.lastName).toBe('Salsa');
    expect(result.currentlyProgram).toBeDefined();
    expect(result.currentlyProgram.statusOffered).toBe(true);
    expect(result.currentlyProgram.batch).toBeInstanceOf(GetMasterBatch);
    expect(result.currentlyProgram.batch.batch).toBe('Batch 1');
    expect(result.currentlyProgram.role).toBeInstanceOf(GetMasterProgramRole);
    expect(result.currentlyProgram.role.roleName).toBe('Role 2');
  });
});
