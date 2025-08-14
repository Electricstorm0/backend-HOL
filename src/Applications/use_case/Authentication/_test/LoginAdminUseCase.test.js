// LoginAdminUseCase.test.js
const LoginAdminUseCase = require('../LoginAdminUseCase');
const UserLogin = require('../../../../Domains/users/entities/UserLogin');
const NewAuth = require('../../../../Domains/authentications/entities/NewAuth');

describe('LoginAdminUseCase', () => {
  it('should orchestrate the login admin action correctly', async () => {
    // Arrange
    const payload = {
      email: 'admin@example.com',
      password: 'secret',
    };

    const mockUser = {
      id: 'user-123',
      password: 'hashed_password',
    };

    const expectedAccessToken = 'access_token';
    const expectedRefreshToken = 'refresh_token';

    // Mock dependencies
    const mockUsersBCFRepository = {
      verifyUserCredential: jest.fn().mockResolvedValue(mockUser),
    };

    const mockMasterEmployeesBCFRepository = {}; // Tidak dipakai di use case ini
    const mockAuthenticationRepository = {
      addToken: jest.fn().mockResolvedValue(),
    };
    const mockAuthenticationTokenManager = {
      createAccessToken: jest.fn().mockResolvedValue(expectedAccessToken),
      createRefreshToken: jest.fn().mockResolvedValue(expectedRefreshToken),
    };
    const mockPasswordHash = {
      comparePassword: jest.fn().mockResolvedValue(),
    };
    const mockMasterBatchRepository = {}; // Tidak dipakai di use case ini

    const loginAdminUseCase = new LoginAdminUseCase({
      usersBCFRepository: mockUsersBCFRepository,
      masterEmployeesBCFRepository: mockMasterEmployeesBCFRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
      masterBatchRepository: mockMasterBatchRepository,
    });

    // Act
    const result = await loginAdminUseCase.execute(payload);

    // Assert
    expect(mockUsersBCFRepository.verifyUserCredential).toHaveBeenCalledWith({ email: payload.email });

    expect(mockPasswordHash.comparePassword).toHaveBeenCalledWith(payload.password, mockUser.password);

    expect(mockAuthenticationTokenManager.createAccessToken).toHaveBeenCalledWith({ id: mockUser.id, role: 'ADMIN', scope: ['3'] });

    expect(mockAuthenticationTokenManager.createRefreshToken).toHaveBeenCalledWith({ id: mockUser.id, role: 'ADMIN', scope: ['3'] });

    expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith(expectedRefreshToken);

    expect(result).toStrictEqual(
      new NewAuth({
        accessToken: expectedAccessToken,
        refreshToken: expectedRefreshToken,
      })
    );
  });
});
