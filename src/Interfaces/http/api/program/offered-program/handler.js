const autoBind = require('auto-bind');
const GetOfferedProgramByUsersUseCase = require('../../../../../Applications/use_case/Program/Offered_Program/GetOfferedProgramByUsersUseCase');

class OfferedProgramHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async getOfferedProgramByUsersHandler(request, h) {
    const useCase = this._container.getInstance(GetOfferedProgramByUsersUseCase.name);
    const data = await useCase.execute(request.auth.credentials);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = OfferedProgramHandler;
