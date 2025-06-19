const GetMasterRegencies = require('../../../../Domains/domicile/regencies/entities/GetMasterRegencies');

class GetProvinciesByRegenciesUseCase {
  constructor({ masterRegenciesRepository }) {
    this._masterRegenciesRepository = masterRegenciesRepository;
  }

  async execute({ id }) {
    const data = await this._masterRegenciesRepository.readByProvinciesId({ id });
    return Promise.all(data.map((value) => ({
      ...new GetMasterRegencies(value),
    })));
  }
}

module.exports = GetProvinciesByRegenciesUseCase;
