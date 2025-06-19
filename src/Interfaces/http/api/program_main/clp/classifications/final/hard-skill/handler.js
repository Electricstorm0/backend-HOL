// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');
const CLPGetClassificationsHSUseCase = require('../../../../../../../../Applications/use_case/Program_Main/CLP/Classifications/Final/Hard-Skill/CLPGetClassificationsHSUseCase');
const CLPGetClassificationsHSByDivisionInstitutionsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/CLP/Classifications/Final/Hard-Skill/CLPGetClassificationsHSByDivisionInstitutionsUseCase');

class ClassificationsFinalHSHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getClassificationsHSHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetClassificationsHSUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getClassificationsHSByDivisionInstitutionsHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetClassificationsHSByDivisionInstitutionsUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = ClassificationsFinalHSHandler;
