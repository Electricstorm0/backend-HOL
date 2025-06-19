const UserLogin = require('../../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');

class LoginAdminUseCase {
  constructor({ usersBCFRepository, masterEmployeesBCFRepository, authenticationRepository, authenticationTokenManager, passwordHash, masterBatchRepository }) {
    this._usersBCFRepository = usersBCFRepository;
    this._masterEmployeesBCFRepository = masterEmployeesBCFRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
    this._masterBatchRepository = masterBatchRepository;
  }

  async execute(payload) {
    try {
      const { email, password } = new UserLogin(payload);

      const { id, password: hashedPassword } = await this._usersBCFRepository.verifyUserCredential({ email });
      await this._passwordHash.comparePassword(password, hashedPassword);

      const accessToken = await this._authenticationTokenManager.createAccessToken({ id, role: 'ADMIN', scope: ['3'] });
      const refreshToken = await this._authenticationTokenManager.createRefreshToken({ id, role: 'ADMIN', scope: ['3'] });

      const newAuthentication = new NewAuthentication({
        accessToken,
        refreshToken,
      });

      await this._authenticationRepository.addToken(newAuthentication.refreshToken);

      return newAuthentication;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LoginAdminUseCase;
