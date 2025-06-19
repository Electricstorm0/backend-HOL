const CLPGetUsersMeDetail = require('../../../../../Domains/program_main/clp/users/entities/CLPGetUsersMeDetail');
const CLPGetUsersUniversities = require('../../../../../Domains/program_main/clp/users/entities/CLPGetUsersUniversities');

class CLPGetUsersMeDetailUseCase {
  constructor({
    usersRepository,
    usersDetailRepository,
    usersUniversitiesRepository,
    clpUsersRepository,
    getProgramThirdTierByUsersAndBatch,
    lEADGetInstitutionsByDivisionInstitutionsUseCase,
    getUniversitiesUsersUseCase,
    getDomicilesUsersUseCase,
    masterRegenciesRepository,
  }) {
    this._usersRepository = usersRepository;
    this._usersDetailRepository = usersDetailRepository;
    this._usersUniversitiesRepository = usersUniversitiesRepository;
    this._clpUsersRepository = clpUsersRepository;
    this._getProgramThirdTierByUsersAndBatch = getProgramThirdTierByUsersAndBatch;
    this._getUniversitiesUsersUseCase = getUniversitiesUsersUseCase;
    this._getDomicilesUsersUseCase = getDomicilesUsersUseCase;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._masterRegenciesRepository = masterRegenciesRepository;
  }

  async execute({ id: usersId }, { batchId }) {
    const { id: CLPUsersId } = await this._clpUsersRepository.readyByBatchAndUsersId({
      batchId,
      usersId,
    });

    const thirdTierProgram = await this._getProgramThirdTierByUsersAndBatch.execute({
      batchId,
      usersId,
    });
    const users = await this._usersRepository.readById({ id: usersId });
    const usersDetail = await this._usersDetailRepository.readById({
      id: usersId,
    });

    const universitiesDetail = (await this._getUniversitiesUsersUseCase.execute({ usersId, batchId })) || {};
    const usersUniversities = await this._usersUniversitiesRepository.readByUsersAndBatchId({
      usersId,
      batchId,
    });

    const usersDomicile = await this._getDomicilesUsersUseCase.execute({
      usersId,
      batchId,
    });

    const CLPUsers = await this._clpUsersRepository.readById({
      id: CLPUsersId,
    });
    const { id_regencies: regenciesUsersLocationId } = CLPUsers;
    const { name: regenciesUsersLocation } = (await this._masterRegenciesRepository.readById({
      id: regenciesUsersLocationId,
    })) || { name: '' };
    const { id_lead_division_institutions: divisionInstitutionsId } = CLPUsers;
    const institutions = await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({
      id: divisionInstitutionsId,
    });

    return new CLPGetUsersMeDetail({
      CLPUsersId,
      ...users,
      ...usersDetail,
      ...CLPUsers,
      regenciesUsersLocation,
      universities: {
        ...new CLPGetUsersUniversities({
          ...usersUniversities,
          universitiesDetail,
        }),
      },
      institutions,
      ...thirdTierProgram,
      domicile: usersDomicile,
    });
  }
}

module.exports = CLPGetUsersMeDetailUseCase;
