// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');

class ClassificationsFinalHSHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getClassificationsSSHandler(request, h) {
    // const useCase = this._container.getInstance(CLPGetClassificationsPATUseCase.name);
    // const data = await useCase.execute();

    return h.response({
      status: 'success',
      data: 0,
    });
  }
}

module.exports = ClassificationsFinalHSHandler;
