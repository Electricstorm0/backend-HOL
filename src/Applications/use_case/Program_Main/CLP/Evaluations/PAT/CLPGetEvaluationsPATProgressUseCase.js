class CLPGetEvaluationsPATProgressUseCase {
  constructor({
    cLPUsersRepository, cLPEvaluationsPATFinalRepository,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPEvaluationsPATFinalRepository = cLPEvaluationsPATFinalRepository;
  }

  async execute({ id }) {
    const {
      id_lead_division_institutions: divisionInstitutionsId,
    } = await this._cLPUsersRepository.readById({ id });
    const { totalUsersDivision } = await this._cLPUsersRepository.readCountByDivisionInstitutionsId({ divisionInstitutionsId, usersId: id });
    const { hasEvaluated } = await this._cLPEvaluationsPATFinalRepository.readCountByUsersId({ id });
    return {
      hasEvaluated,
      totalUsersDivision,
      notEvaluated: totalUsersDivision - hasEvaluated,
      progress: (hasEvaluated / totalUsersDivision) * 100,
    };
  }
}

module.exports = CLPGetEvaluationsPATProgressUseCase;
