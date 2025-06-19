const GetUniversitiesUseCase = require('../../../../Applications/use_case/Universities/GetUniversitiesUseCase');

class UniversitiesHandler {
  constructor(container) {
    this._container = container;

    this.getUniversitiesHandler = this.getUniversitiesHandler.bind(this);
  }

  async getUniversitiesHandler(request, h) {
    const getUniversitiesUseCase = this._container.getInstance(GetUniversitiesUseCase.name);
    const data = await getUniversitiesUseCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = UniversitiesHandler;
