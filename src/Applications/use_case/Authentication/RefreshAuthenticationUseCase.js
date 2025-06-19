class RefreshAuthenticationUseCase {
  constructor({ authenticationRepository, authenticationTokenManager, getOfferedProgramCurrentActiveUseCase }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._getOfferedProgramCurrentActiveUseCase = getOfferedProgramCurrentActiveUseCase;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const { id } = await this._authenticationTokenManager.decodePayload(refreshToken);

    const { roleId, batchId, offeredProgramId } = await this._getOfferedProgramCurrentActiveUseCase.execute({ id });

    return this._authenticationTokenManager.createAccessToken({
      id,
      batchId,
      offeredProgramId,
      scope: [String(roleId)],
    });
  }

  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
