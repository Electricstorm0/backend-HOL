/* eslint-disable no-restricted-syntax */
const UserLogin = require('../../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({ usersRepository, authenticationRepository, authenticationTokenManager, passwordHash, getOfferedProgramCurrentActiveUseCase }) {
    this._usersRepository = usersRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
    this._getOfferedProgramCurrentActiveUseCase = getOfferedProgramCurrentActiveUseCase;
  }

  async execute(useCasePayload) {
    try {
      const { email, password } = new UserLogin(useCasePayload);

      const { id, password: hashedPassword } = await this._usersRepository.verifyUserCredential({ email });
      await this._passwordHash.comparePassword(password, hashedPassword);

      const { roleId, batchId, offeredProgramId } = await this._getOfferedProgramCurrentActiveUseCase.execute({ id });

      const accessToken = await this._authenticationTokenManager.createAccessToken({
        id,
        batchId,
        offeredProgramId,
        scope: [String(roleId)],
      });
      const refreshToken = await this._authenticationTokenManager.createRefreshToken({
        id,
        batchId,
        offeredProgramId,
        scope: [String(roleId)],
      });

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

module.exports = LoginUserUseCase;
