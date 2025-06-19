const CLPGetMasterClassificationsFinalHS = require('../../../../../../../Domains/program_main/clp/classifications/final/entities/CLPGetMasterClassificationsFinalHS');

class CLPGetClassificationsHSByDivisionInstitutionsUseCase {
  constructor({
    cLPMasterClassificationsFinalHSRepository,
    lEADGetInstitutionsByDivisionInstitutionsUseCase,
  }) {
    this._cLPMasterClassificationsFinalHSRepository = cLPMasterClassificationsFinalHSRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
  }

  async execute({ id }) {
    const classificationsHS = await this._cLPMasterClassificationsFinalHSRepository.readByDivisionInstitutionsId({ id });
    const classifications = await Promise.all(classificationsHS.map(async (value) => ({
      ...new CLPGetMasterClassificationsFinalHS(value),
    })));
    const institutions = await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({ id });
    return {
      ...institutions,
      classifications,
    };
  }
}

module.exports = CLPGetClassificationsHSByDivisionInstitutionsUseCase;
