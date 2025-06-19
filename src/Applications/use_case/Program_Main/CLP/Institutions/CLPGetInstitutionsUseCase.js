const LEADGetInstitutions = require('../../../../../Domains/program_main/lead/institutions/entities/LEADGetInstitutions');

class CLPGetInstitutionsUseCase {
  constructor({
    lEADInstitutionsRepository,
  }) {
    this._lEADInstitutionsRepository = lEADInstitutionsRepository;
  }

  async execute() {
    const institutions = await this._lEADInstitutionsRepository.read();
    const data = await Promise.all(institutions.map(async (value) => ({
      ...new LEADGetInstitutions({ ...value }),
    })));
    return data;
  }
}

module.exports = CLPGetInstitutionsUseCase;
