// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');
const CLPGetMentorsUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsUseCase');
const CLPGetMentorsByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsByIdUseCase');

class MentorsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getMentorsHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetMentorsUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getMentorsByIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetMentorsByIdUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = MentorsHandler;
