const CLPGetMasterClassificationsFinalHS = require('../../../../../../Domains/program_main/clp/classifications/final/entities/CLPGetMasterClassificationsFinalHS');
const CLPGetEvaluationsFinalHS = require('../../../../../../Domains/program_main/clp/evaluations/final/entities/CLPGetEvaluationsFinalHS');

class CLPGetEvaluationsFinalSSUseCase {
  constructor({
    cLPEvaluationsFinalSSRepository, cLPMasterClassificationsFinalSSRepository,
  }) {
    this._cLPEvaluationsFinalSSRepository = cLPEvaluationsFinalSSRepository;
    this._cLPMasterClassificationsFinalSSRepository = cLPMasterClassificationsFinalSSRepository;
  }

  async execute({ id }) {
    const evaluations = await this._cLPEvaluationsFinalSSRepository.readByFinalEvaluationsId({ id });
    const data = await Promise.all(evaluations.map(async (value) => ({
      ...new CLPGetEvaluationsFinalHS(value),
      ...new CLPGetMasterClassificationsFinalHS(await this._cLPMasterClassificationsFinalSSRepository.readById({ id: value.id_clp_kpi_ss })),
    })));
    return data;
  }
}

module.exports = CLPGetEvaluationsFinalSSUseCase;
