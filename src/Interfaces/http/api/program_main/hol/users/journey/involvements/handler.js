const HOLCreateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLCreateUsersInvolvementsUseCase');
const HOLUpdateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLUpdateUsersInvolvementsUseCase');
const HOLDeleteUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLDeleteUsersInvolvementsUseCase');
const HOLGetDetailInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLGetDetailInvolvementsUseCase');
const autoBind = require('auto-bind');
const HOLGetUsersInvolvementssByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLGetUsersInvolvementsByIdUseCase');

class HolUsersInvolvementsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async postHolUsersInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateUsersInvolvementsUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added Involvements successfully!',
      data,
    });
    response.code(201);
    return response;
  }

  async getOwnHolInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersInvolvementssByIdUseCase.name);
    const data = await useCase.execute(request.auth.credentials);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getHolInvolvementsByUsersIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersInvolvementssByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getDetailHolInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetDetailInvolvementsUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putHolUsersInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateUsersInvolvementsUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated Involvements successfully',
    });
    return response;
  }

  async deleteHolUsersInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteUsersInvolvementsUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted Involvements successfully',
    });
    return response;
  }
}

module.exports = HolUsersInvolvementsHandler;
