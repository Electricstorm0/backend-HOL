const autoBind = require('auto-bind');
// eslint-disable-next-line import/no-unresolved
const CLPGetEvaluationsFinalDetailUseCase = require('../../../../../../../Applications/use_case/Program_Main/CLP/Evaluations/Final/CLPGetEvaluationsFinalDetailUseCase');

class EvaluationsFinalHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getEvaluationsFinalByUsersIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetEvaluationsFinalDetailUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.query);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = EvaluationsFinalHandler;
