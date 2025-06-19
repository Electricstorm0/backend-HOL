const autoBind = require('auto-bind');
const CLPGetUsersMeUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersMeUseCase');
const CLPGetUsersMeDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersMeDetailUseCase');
const CLPUpdateUsersDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Users/CLPUpdateUsersDetailUseCase');
const CLPGetUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersUseCase');
const CLPGetUsersDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersDetailUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postUsersHandler(request, h) {
    return h.response({
      status: 'success',
      message: 'usecase not implemented!',
    });
  }

  async putUsersHandler(request, h) {
    try {
      const useCase = this._container.getInstance(CLPUpdateUsersDetailUseCase.name);
      const { firstName, lastName } = await useCase.execute(request.auth.credentials, request.payload);

      return h.response({
        status: 'success',
        message: `${firstName} ${lastName} updated successfully!`,
        data: {
          firstName,
          lastName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUsersHandler(request, h) {
    return h.response({
      status: 'success',
      message: 'usecase not implemented!',
    });
  }

  async getUsersHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetUsersUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getUsersByIdHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetUsersDetailUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getOwnUsersHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetUsersMeUseCase.name);
    const data = await useCase.execute(request.auth.credentials);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getOwnUsersDetailHandler(request, h) {
    const useCase = this._container.getInstance(CLPGetUsersMeDetailUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.query);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = UsersHandler;
