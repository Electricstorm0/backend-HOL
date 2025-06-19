const CLPGetMasterClassificationsFinalBCF = require('../../../../../../Domains/program_main/clp/classifications/final/entities/CLPGetMasterClassificationsFinalBCF');
const CLPGetEvaluationsFinalBCF = require('../../../../../../Domains/program_main/clp/evaluations/final/entities/CLPGetEvaluationsFinalBCF');

class CLPGetEvaluationsFinalBCFUseCase {
  constructor({
    cLPEvaluationsFinalBCFRepository, cLPMasterClassificationsFinalBCFRepository,
  }) {
    this._cLPEvaluationsFinalBCFRepository = cLPEvaluationsFinalBCFRepository;
    this._cLPMasterClassificationsFinalBCFRepository = cLPMasterClassificationsFinalBCFRepository;
  }

  async execute({ id }) {
    const evaluations = await this._cLPEvaluationsFinalBCFRepository.readByFinalEvaluationsId({ id });
    const data = await Promise.all(evaluations.map(async (value) => ({
      ...new CLPGetEvaluationsFinalBCF(value),
      ...new CLPGetMasterClassificationsFinalBCF(await this._cLPMasterClassificationsFinalBCFRepository.readById({ id: value.id_clp_kpi_bcf })),
    })));
    return data;
  }
}

module.exports = CLPGetEvaluationsFinalBCFUseCase;
