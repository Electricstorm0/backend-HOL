const HOLCreateUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLCreateUsersUseCase');
const HOLDeleteUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLDeleteUsersUseCase');
const HOLGetUsersByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersByIdUseCase');
const HOLGetUsersMeUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersMeUseCase');
const HOLGetUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersUseCase');
const HOLUpdateUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLUpdateUsersUseCase');
const HOLGetUsersMeDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersMeDetailUseCase');
const HOLGetTotalUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetTotalUsersUseCase');
const HOLGetTotalUsersByProgramUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetTotalUsersByProgramUseCase');
const autoBind = require('auto-bind');

class HolUsersHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postHolUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateUsersUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added users successfully!',
      data,
    });
    response.code(201);
    return response;
  }

  async getHolUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getHolUsersByIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getOwnUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersMeUseCase.name);
    const data = await useCase.execute(request.auth.credentials);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getOwnUsersDetailHandler(request, h) {
    const { id: usersId, batchId } = request.auth.credentials;
    const useCase = this._container.getInstance(HOLGetUsersMeDetailUseCase.name);
    const data = await useCase.execute({ id: usersId }, { batchId });

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getUsersDetailByUsersIdHandler(request, h) {
    const { id: usersId, batchId } = request.params;
    const useCase = this._container.getInstance(HOLGetUsersMeDetailUseCase.name);
    const data = await useCase.execute({ id: usersId }, { batchId });

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersHolHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetTotalUsersUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersHolByProgramHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetTotalUsersByProgramUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putHolUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateUsersUseCase.name);
    await useCase.execute(request.auth.credentials, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated users successfully',
    });
    return response;
  }

  async deleteHolUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteUsersUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted users successfully',
    });
    return response;
  }
}

module.exports = HolUsersHandler;
