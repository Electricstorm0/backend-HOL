// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');

const CLPGetEvaluationsUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Evaluations/CLPGetEvaluationsUseCase');
const CLPGetEvaluationsDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Evaluations/CLPGetEvaluationsDetailUseCase');

class EvaluationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getEvaluationsHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetEvaluationsUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getEvaluationsByIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetEvaluationsDetailUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = EvaluationsHandler;
