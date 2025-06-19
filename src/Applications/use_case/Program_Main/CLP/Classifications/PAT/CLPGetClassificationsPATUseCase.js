const CLPGetMasterClassificationsPAT = require('../../../../../../Domains/program_main/clp/classifications/pat/entities/CLPGetMasterClassificationsPAT');

class CLPGetClassificationsPATUseCase {
  constructor({
    cLPMasterClassificationsPATRepository,
  }) {
    this._cLPMasterClassificationsPATRepository = cLPMasterClassificationsPATRepository;
  }

  async execute() {
    const data = await this._cLPMasterClassificationsPATRepository.read();
    return data.map((value) => ({
      ...new CLPGetMasterClassificationsPAT(value),
    }));
  }
}

module.exports = CLPGetClassificationsPATUseCase;
