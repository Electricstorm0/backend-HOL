class CLPGetEvaluationsDetailUseCase {
  constructor({
    cLPUsersRepository, cLPGetEvaluationsFinalDetailUseCase, cLPGetEvaluationsPATProgressUseCase,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPGetEvaluationsFinalDetailUseCase = cLPGetEvaluationsFinalDetailUseCase;
    this._cLPGetEvaluationsPATProgressUseCase = cLPGetEvaluationsPATProgressUseCase;
  }

  async execute({ id: CLPUsersId }) {
    const { id_batch: batchId, id_users: usersId } = await this._cLPUsersRepository.readById({ id: CLPUsersId });
    const users = await this._cLPGetEvaluationsFinalDetailUseCase.execute({ id: usersId }, { batchId });
    const evaluatedPAT = await this._cLPGetEvaluationsPATProgressUseCase.execute({ id: CLPUsersId });
    return { ...users, evaluatedPAT };
  }
}

module.exports = CLPGetEvaluationsDetailUseCase;
