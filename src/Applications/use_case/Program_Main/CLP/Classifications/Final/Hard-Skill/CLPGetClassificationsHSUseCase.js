const CLPGetMasterClassificationsFinalHS = require('../../../../../../../Domains/program_main/clp/classifications/final/entities/CLPGetMasterClassificationsFinalHS');

class CLPGetClassificationsHSUseCase {
  constructor({
    cLPMasterClassificationsFinalHSRepository,
    lEADGetInstitutionsByDivisionInstitutionsUseCase,
  }) {
    this._cLPMasterClassificationsFinalHSRepository = cLPMasterClassificationsFinalHSRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
  }

  async execute({ pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._cLPMasterClassificationsFinalHSRepository.readCount();
    const numPages = Math.ceil(numRows / numPerPage);

    const classifications = await this._cLPMasterClassificationsFinalHSRepository.read({ skip, numPerPage });
    const hardskill = await Promise.all(classifications.map(async (value) => ({
      ...new CLPGetMasterClassificationsFinalHS({ ...value }),
      institutions: await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({ id: value.id_lead_division_institutions }),
    })));

    return {
      hardskill,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = CLPGetClassificationsHSUseCase;
