const CLPGetMasterClassificationsFinalHS = require('../../../../../../Domains/program_main/clp/classifications/final/entities/CLPGetMasterClassificationsFinalHS');
const CLPGetEvaluationsFinalHS = require('../../../../../../Domains/program_main/clp/evaluations/final/entities/CLPGetEvaluationsFinalHS');

class CLPGetEvaluationsFinalHSUseCase {
  constructor({
    cLPEvaluationsFinalHSRepository, cLPMasterClassificationsFinalHSRepository,
  }) {
    this._cLPEvaluationsFinalHSRepository = cLPEvaluationsFinalHSRepository;
    this._cLPMasterClassificationsFinalHSRepository = cLPMasterClassificationsFinalHSRepository;
  }

  async execute({ id }) {
    const evaluations = await this._cLPEvaluationsFinalHSRepository.readByFinalEvaluationsId({ id });
    const data = await Promise.all(evaluations.map(async (value) => ({
      ...new CLPGetEvaluationsFinalHS(value),
      ...new CLPGetMasterClassificationsFinalHS(await this._cLPMasterClassificationsFinalHSRepository.readById({ id: value.id_clp_kpi_hs })),
    })));
    return data;
  }
}

module.exports = CLPGetEvaluationsFinalHSUseCase;
