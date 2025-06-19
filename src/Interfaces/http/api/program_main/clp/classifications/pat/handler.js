// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');
const CLPGetClassificationsPATUseCase = require('../../../../../../../Applications/use_case/Program_Main/CLP/Classifications/PAT/CLPGetClassificationsPATUseCase');

class ClassificationsPATHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getClassificationsPATHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetClassificationsPATUseCase.name);
    const data = await useCase.execute();

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = ClassificationsPATHandler;
