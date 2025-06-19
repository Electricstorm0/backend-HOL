const LEADGetMasterDivision = require('../../../../../Domains/program_main/lead/division/entities/LEADGetMasterDivision');
const LEADGetInstitutions = require('../../../../../Domains/program_main/lead/institutions/entities/LEADGetInstitutions');

class CLPGetInstitutionsDetailUseCase {
  constructor({
    lEADInstitutionsRepository, lEADDivisionInstitutionsRepository,
    lEADMasterDivisionRepository, lEADGetInstitutionsByDivisionInstitutionsUseCase,
  }) {
    this._lEADInstitutionsRepository = lEADInstitutionsRepository;
    this._lEADDivisionInstitutionsRepository = lEADDivisionInstitutionsRepository;
    this._lEADMasterDivisionRepository = lEADMasterDivisionRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
  }

  async execute({ id }) {
    const institutions = new LEADGetInstitutions({ ...await this._lEADInstitutionsRepository.readById({ id }) });
    const divisionInstitutions = await this._lEADDivisionInstitutionsRepository.readByInstitutionsId({ id: institutions.institutionsId });
    const division = await Promise.all(divisionInstitutions.map(async (value) => ({
      ...new LEADGetMasterDivision({ ...await this._lEADMasterDivisionRepository.readById({ id: value.id_lead_division }) }),
    })));
    return {
      ...institutions,
      division,
    };
  }
}

module.exports = CLPGetInstitutionsDetailUseCase;
