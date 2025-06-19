// eslint-disable-next-line import/no-unresolved
const autoBind = require('auto-bind');

const LEADGetUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/LEAD/LEADGetUsersUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getUsersHandler(request, h) {
    const useCase = this._container.getInstance(LEADGetUsersUseCase.name);
    const data = await useCase.getUser(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = UsersHandler;
