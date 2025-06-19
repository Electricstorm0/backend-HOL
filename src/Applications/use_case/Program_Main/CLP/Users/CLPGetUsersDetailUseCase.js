class CLPGetUsersDetailUseCase {
  constructor({
    cLPUsersRepository, cLPGetUsersMeDetailUseCase,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPGetUsersMeDetailUseCase = cLPGetUsersMeDetailUseCase;
  }

  async execute({ id: CLPusersId }) {
    const {
      id_batch: batchId,
      id_users: usersId,
    } = await this._cLPUsersRepository.readById({ id: CLPusersId });
    const data = await this._cLPGetUsersMeDetailUseCase.execute({ id: usersId }, { batchId });
    return data;
  }
}

module.exports = CLPGetUsersDetailUseCase;
