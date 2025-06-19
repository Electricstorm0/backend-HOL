const GetMasterProvincies = require('../../../Domains/domicile/provincies/entities/GetMasterProvincies');
const GetMasterRegencies = require('../../../Domains/domicile/regencies/entities/GetMasterRegencies');
const GetUsersDomicile = require('../../../Domains/users/entities/GetUsersDomicile');

class GetDomicilesUsersUseCase {
  constructor({ usersDomicileRepository, masterProvinciesRepository, masterRegenciesRepository }) {
    this._usersDomicileRepository = usersDomicileRepository;
    this._masterProvinciesRepository = masterProvinciesRepository;
    this._masterRegenciesRepository = masterRegenciesRepository;
  }

  async execute({ usersId, batchId }) {
    const usersDomicile = await this._usersDomicileRepository.readByUsersAndBatchId({ usersId, batchId });
    const domicile = await Promise.all(usersDomicile.map(async (value) => ({
      ...new GetUsersDomicile(value),
      ...new GetMasterProvincies(await this._masterProvinciesRepository.readById({ id: value.id_provincies }) || {}),
      ...new GetMasterRegencies(await this._masterRegenciesRepository.readById({ id: value.id_regencies }) || {}),
    })));
    return domicile;
  }
}

module.exports = GetDomicilesUsersUseCase;
