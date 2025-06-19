const CLPGetEvaluationsPATHasEvaluatedUsers = require('../../../../../../Domains/program_main/clp/evaluations/pat/entities/CLPGetEvaluationsPATHasEvaluatedUsers');

class CLPGetEvaluationsPATHasEvaluatedUsersUseCase {
  constructor({
    usersDetailRepository, cLPUsersRepository, cLPEvaluationsPATFinalRepository,
  }) {
    this._usersDetailRepository = usersDetailRepository;
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPEvaluationsPATFinalRepository = cLPEvaluationsPATFinalRepository;
  }

  async execute({ id: usersId }, { batchId }) {
    const {
      id: usersCLPId,
      id_lead_division_institutions: divisionInstitutionsId,
    } = await this._cLPUsersRepository.readyByBatchAndUsersId({ batchId, usersId });
    const usersHasSameDivision = await this._cLPUsersRepository.readByDivisionInstitutionsId({
      divisionInstitutionsId, id: usersCLPId,
    });
    const result = await Promise.all(usersHasSameDivision.map(async (value) => ({
      ...new CLPGetEvaluationsPATHasEvaluatedUsers({
        usersClPId: value.id,
        ...await this._usersDetailRepository.readById({ id: value.id_users }),
        hasEvaluated: await this._cLPEvaluationsPATFinalRepository.readUsersHasEvaluated({
          usersId: usersCLPId,
          usersIdHasEvaluated: value.id,
        }),
      }),
    })));
    return result;
  }
}

module.exports = CLPGetEvaluationsPATHasEvaluatedUsersUseCase;
