/* eslint-disable no-undef */
const UserRepository = require('../../../../Domains/users/UsersRepository');
const AuthenticationRepository = require('../../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../../security/AuthenticationTokenManager');
const PasswordHash = require('../../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');
const NewAuth = require('../../../../Domains/authentications/entities/NewAuth');
const GetOfferedProgramCurrentActiveUseCase = require('../../../../Applications/use_case/Program/Offered_Program/GetOfferedProgramCurrentActiveUseCase');

describe('LoginUserUseCase', () => {
  it('should orchestrate the login action correctly', async () => {
    // Arrange
    const useCasePayload = {
      email: 'dicoding@example.com',
      password: 'secret',
    };

    const expectedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();
    const mockGetOfferedProgramCurrentActiveUseCase = {
      execute: jest.fn().mockResolvedValue({
        roleId: 4,
        batchId: 2,
        offeredProgramId: 4,
      }),
    };

    // Mocking repository and services
    mockUserRepository.verifyUserCredential = jest.fn().mockResolvedValue({
      id: 'user-123',
      password: 'hashed_password',
    });

    mockPasswordHash.comparePassword = jest.fn().mockResolvedValue();

    mockGetOfferedProgramCurrentActiveUseCase.execute = jest.fn().mockResolvedValue({
      roleId: 4,
      batchId: 2,
      offeredProgramId: 4,
    });

    mockAuthenticationTokenManager.createAccessToken = jest.fn().mockResolvedValue(expectedAuthentication.accessToken);
    mockAuthenticationTokenManager.createRefreshToken = jest.fn().mockResolvedValue(expectedAuthentication.refreshToken);

    mockAuthenticationRepository.addToken = jest.fn().mockResolvedValue();

    const loginUserUseCase = new LoginUserUseCase({
      usersRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
      getOfferedProgramCurrentActiveUseCase: mockGetOfferedProgramCurrentActiveUseCase,
    });

    // Act
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.verifyUserCredential).toBeCalledWith({ email: useCasePayload.email });
    expect(mockPasswordHash.comparePassword).toBeCalledWith('secret', 'hashed_password');
    expect(mockGetOfferedProgramCurrentActiveUseCase.execute).toBeCalledWith({ id: 'user-123' });
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      id: 'user-123',
      batchId: 2,
      offeredProgramId: 4,
      scope: ['4'],
    });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({
      id: 'user-123',
      batchId: 2,
      offeredProgramId: 4,
      scope: ['4'],
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith('refresh_token');
  });
});
