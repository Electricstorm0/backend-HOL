const CLPGetUsers = require('../../../../../Domains/program_main/clp/users/entities/CLPGetUsers');

class CLPGetEvaluationsUseCase {
  constructor({
    cLPUsersRepository, cLPEvaluationsFinalRepository,
    lEADGetInstitutionsByDivisionInstitutionsUseCase, cLPGetEvaluationsPATProgressUseCase,
    cLPGetMentorsDetailUseCase,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPEvaluationsFinalRepository = cLPEvaluationsFinalRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._cLPGetEvaluationsPATProgressUseCase = cLPGetEvaluationsPATProgressUseCase;
    this._cLPGetMentorsDetailUseCase = cLPGetMentorsDetailUseCase;
  }

  async execute({ batchId, pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._cLPUsersRepository.readCountUsers({ batchId });
    const numPages = Math.ceil(numRows / numPerPage);

    const clpUsers = await this._cLPUsersRepository.read({ skip, numPerPage, batchId });

    const users = await Promise.all(clpUsers.map(async (value) => ({
      ...new CLPGetUsers({
        ...value,
        institutions: await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({
          id: value.id_lead_division_institutions,
        }),
        mentors: await this._cLPGetMentorsDetailUseCase.execute({ id: value.id_clp_mentor }),
        progressPAT: await this._cLPGetEvaluationsPATProgressUseCase.execute({
          id: value.id,
        }),
      }),
    })));

    return {
      users,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = CLPGetEvaluationsUseCase;
