const HOLCreateUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLCreateUsersUseCase');
const HOLDeleteUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLDeleteUsersUseCase');
const HOLGetUsersByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetUsersByIdUseCase');
const HOLGetUsersMeUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetUsersMeUseCase');
const HOLGetUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetUsersUseCase');
const HOLUpdateUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLUpdateUsersUseCase');
const HOLGetUsersMeDetailUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetUsersMeDetailUseCase');
const HOLGetTotalUsersUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetTotalUsersUseCase');
const HOLGetTotalUsersByProgramUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/users/HOLGetTotalUsersByProgramUseCase');
// const HOLGetUsersMeDetail = require('../../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMeDetail');

class HolUsersHandler {
  constructor(container) {
    this._container = container;
    this.postHolUsersHandler = this.postHolUsersHandler.bind(this);
    this.getHolUsersHandler = this.getHolUsersHandler.bind(this);
    this.getHolUsersByIdHandler = this.getHolUsersByIdHandler.bind(this);
    this.getOwnUsersHandler = this.getOwnUsersHandler.bind(this);
    this.getOwnUsersDetailHandler = this.getOwnUsersDetailHandler.bind(this);
    this.getTotalUsersHolHandler = this.getTotalUsersHolHandler.bind(this);
    this.getTotalUsersHolByProgramHandler = this.getTotalUsersHolByProgramHandler.bind(this);
    this.putHolUsersHandler = this.putHolUsersHandler.bind(this);
    this.deleteHolUsersHandler = this.deleteHolUsersHandler.bind(this);
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
    await useCase.execute(request.params, request.payload);
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
