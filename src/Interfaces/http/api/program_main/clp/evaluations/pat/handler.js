const autoBind = require('auto-bind');
// eslint-disable-next-line import/no-unresolved
const CLPGetEvaluationsPATHasEvaluatedUsersUseCase = require('../../../../../../../Applications/use_case/Program_Main/CLP/Evaluations/PAT/CLPGetEvaluationsPATHasEvaluatedUsersUseCase');
const CLPPostEvaluationsPATUsersUseCase = require('../../../../../../../Applications/use_case/Program_Main/CLP/Evaluations/PAT/CLPPostEvaluationsPATUsersUseCase');

class EvaluationsPATHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getEvaluationsPATHasEvaluatedByUsersIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetEvaluationsPATHasEvaluatedUsersUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async postEvaluationsPATByUsersIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPPostEvaluationsPATUsersUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.params, request.payload);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = EvaluationsPATHandler;
