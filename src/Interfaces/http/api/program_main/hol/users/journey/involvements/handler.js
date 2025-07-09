const HOLCreateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLCreateUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetUsersInvolvementsByIdUseCase');
const HOLUpdateUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLUpdateUsersInvolvementsUseCase');
const HOLDeleteUsersInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLDeleteUsersInvolvementsUseCase');
const HOLGetDetailInvolvementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetDetailInvolvementsUseCase');

class HolUsersInvolvementsHandler {
  constructor(container) {
    this._container = container;
    this.postHolUsersInvolvementsHandler = this.postHolUsersInvolvementsHandler.bind(this);
    this.getHolUsersInvolvementsHandler = this.getHolUsersInvolvementsHandler.bind(this);
    this.getHolDetailInvolvementsHandler = this.getHolDetailInvolvementsHandler.bind(this);
    this.getHolUsersInvolvementsByIdHandler = this.getHolUsersInvolvementsByIdHandler.bind(this);
    this.putHolUsersInvolvementsHandler = this.putHolUsersInvolvementsHandler.bind(this);
    this.deleteHolUsersInvolvementsHandler = this.deleteHolUsersInvolvementsHandler.bind(this);
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
