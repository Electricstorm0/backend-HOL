const GetMasterProvincies = require('../../../../Domains/domicile/provincies/entities/GetMasterProvincies');

class GetProvinciesUseCase {
  constructor({ masterProvinciesRepository }) {
    this._masterProvinciesRepository = masterProvinciesRepository;
  }

  async execute() {
    const data = await this._masterProvinciesRepository.read();
    return Promise.all(data.map((value) => ({
      ...new GetMasterProvincies(value),
    })));
  }
}

module.exports = GetProvinciesUseCase;
