// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');
const CLPGetInstitutionsUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Institutions/CLPGetInstitutionsUseCase');
const CLPGetInstitutionsDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Institutions/CLPGetInstitutionsDetailUseCase');

class InstitutionsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getInstitutionsHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetInstitutionsUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getInstitutionsByIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetInstitutionsDetailUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = InstitutionsHandler;
