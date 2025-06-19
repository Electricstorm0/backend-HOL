const CLPGetUsers = require('../../../../../Domains/program_main/clp/users/entities/CLPGetUsers');

class CLPGetUsersUseCase {
  constructor({
    getProgramThirdTierByUsersAndBatch,
    cLPUsersRepository, lEADGetInstitutionsByDivisionInstitutionsUseCase,
    usersDetailRepository, getUniversitiesUsersUseCase,
    offeredProgramRepository, masterProgramThirdTierRepository,
  }) {
    this._getProgramThirdTierByUsersAndBatch = getProgramThirdTierByUsersAndBatch;
    this._cLPUsersRepository = cLPUsersRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._usersDetailRepository = usersDetailRepository;
    this._getUniversitiesUsersUseCase = getUniversitiesUsersUseCase;
    this._offeredProgramRepository = offeredProgramRepository;
    this._masterProgramThirdTierRepository = masterProgramThirdTierRepository;
  }

  async execute({ pageSize, page, batchId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._cLPUsersRepository.readCountUsers({ batchId });
    const numPages = Math.ceil(numRows / numPerPage);

    const clpUsers = await this._cLPUsersRepository.read({ skip, numPerPage, batchId });

    const users = await Promise.all(clpUsers.map(async (value) => ({
      ...new CLPGetUsers({
        ...value,
        universities: await this._getUniversitiesUsersUseCase.execute({
          usersId: value.id_users,
          batchId,
        }),
        institutions: await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({
          id: value.id_lead_division_institutions,
        }),
        program: await this._getProgramThirdTierByUsersAndBatch.execute({ batchId, usersId: value.id_users }),
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

module.exports = CLPGetUsersUseCase;
