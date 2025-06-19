const GetMasterUniversities = require('../../../Domains/universities/entities/GetMasterUniversities');
const GetMasterUniversitiesMajor = require('../../../Domains/universities/entities/GetMasterUniversitiesMajor');

class GetUniversitiesUsersUseCase {
  constructor({
    usersUniversitiesRepository, universitiesMajorRepository, masterUniversitiesRepository,
    masterUniversitiesMajorRepository, masterProvinciesRepository,
    masterRegenciesRepository,
  }) {
    this._usersUniversitiesRepository = usersUniversitiesRepository;
    this._universitiesMajorRepository = universitiesMajorRepository;
    this._masterUniversitiesRepository = masterUniversitiesRepository;
    this._masterUniversitiesMajorRepository = masterUniversitiesMajorRepository;
    this._masterProvinciesRepository = masterProvinciesRepository;
    this._masterRegenciesRepository = masterRegenciesRepository;
  }

  async execute({ usersId, batchId }) {
    const usersUniverisities = await this._usersUniversitiesRepository.readByUsersAndBatchId({ usersId, batchId });
    const { id_major_universities: universitiesMajorId } = usersUniverisities;
    const {
      id_universities: universitiesId,
      id_major: majorId,
    } = await this._universitiesMajorRepository.readById({ id: universitiesMajorId });
    const universities = await this._masterUniversitiesRepository.readById({ id: universitiesId });
    const {
      id_province: provinceId,
      id_regencie: regencieId,
    } = universities;

    const major = await this._masterUniversitiesMajorRepository.readById({ id: majorId });
    const { name: universitiesProvinces } = await this._masterProvinciesRepository.readById({ id: provinceId }) || { name: '' };
    const { name: universitiesRegencies } = await this._masterRegenciesRepository.readById({ id: regencieId }) || { name: '' };
    return {
      ...new GetMasterUniversities(universities),
      ...new GetMasterUniversitiesMajor(major),
      universitiesProvinces,
      universitiesRegencies,
      universitiesProvincesId: provinceId,
      universitiesRegenciesId: regencieId,
    };
  }
}

module.exports = GetUniversitiesUsersUseCase;
