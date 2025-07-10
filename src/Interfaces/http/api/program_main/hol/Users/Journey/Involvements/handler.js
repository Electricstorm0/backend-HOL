const HOLCreateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLCreateUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLGetUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLGetUsersInvolvementsByIdUseCase');
const HOLUpdateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLUpdateUsersInvolvementsUseCase');
const HOLDeleteUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLDeleteUsersInvolvementsUseCase');
const HOLGetDetailInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Involvements/HOLGetDetailInvolvementsUseCase');
const autoBind = require('auto-bind');

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
  async getHolUsersInvolvementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersInvolvementsUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getHolUsersInvolvementsByIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersInvolvementsByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getHolDetailInvolvementsHandler(request, h) {
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
