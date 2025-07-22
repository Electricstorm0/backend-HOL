const HOLGetUsersMeDetail = require('../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMeDetail');
const HOLGetUsersUniversities = require('../../../../../Domains/program_main/hol/users/entities/HOLGetUsersUniversities');

class HOLGetUsersMeDetailUseCase {
  constructor({
    usersRepository,
    usersDetailRepository,
    usersUniversitiesRepository,
    holUsersRepository,
    getProgramSecondTierByUsersAndBatch,
    lEADGetInstitutionsByDivisionInstitutionsUseCase,
    getUniversitiesUsersUseCase,
    getDomicilesUsersUseCase,
    masterRegenciesRepository,
  }) {
    this._usersRepository = usersRepository;
    this._usersDetailRepository = usersDetailRepository;
    this._usersUniversitiesRepository = usersUniversitiesRepository;
    this._holUsersRepository = holUsersRepository;
    this._getProgramSecondTierByUsersAndBatch = getProgramSecondTierByUsersAndBatch;
    this._getUniversitiesUsersUseCase = getUniversitiesUsersUseCase;
    this._getDomicilesUsersUseCase = getDomicilesUsersUseCase;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._masterRegenciesRepository = masterRegenciesRepository;
  }

  async execute({ id: usersId }) {
    const holUsers = await this._holUsersRepository.readByUsersId({ usersId });
    const batchId = holUsers.batchId;
    const secondTierProgram = await this._getProgramSecondTierByUsersAndBatch.execute({ batchId, usersId });
    const users = await this._usersRepository.readById({ id: usersId });
    const usersDetail = await this._usersDetailRepository.readById({ id: usersId });
    const universitiesDetail = await this._getUniversitiesUsersUseCase.execute({ usersId, batchId });
    const usersUniversities = await this._usersUniversitiesRepository.readByUsersAndBatchId({ usersId, batchId });
    const universities = { ...usersUniversities, universitiesDetail };

    const usersDomicile = await this._getDomicilesUsersUseCase.execute({ usersId, batchId });

    const HOLUsers = (await this._holUsersRepository.readById({ id: usersId })) || {};
    const { id_regencies: regenciesUsersLocationId } = HOLUsers;
    const { name: regenciesUsersLocation } = (await this._masterRegenciesRepository.readById({ id: regenciesUsersLocationId })) || { name: '' };
    const { id_lead_division_institutions: divisionInstitutionsId } = HOLUsers || {};
    const institutions = await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({ id: divisionInstitutionsId });

    const data = {
      ...users,
      ...usersDetail,
      ...HOLUsers,
      regenciesUsersLocation,
      universities: { ...new HOLGetUsersUniversities(universities) },
      institutions,
      ...secondTierProgram,
      domicile: usersDomicile,
    };
    return new HOLGetUsersMeDetail(data);
  }
}

module.exports = HOLGetUsersMeDetailUseCase;
