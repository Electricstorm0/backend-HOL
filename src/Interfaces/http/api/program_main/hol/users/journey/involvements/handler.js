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
    const createHolUsersInvolvementsUseCase = this._container.getInstance(HOLCreateUsersInvolvementsUseCase.name);
    await createHolUsersInvolvementsUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added Involvements successfully!',
    });
    response.code(201);
    return response;
  }
  async getHolUsersInvolvementsHandler(request, h) {
    const getAllUsersInvolvementsUseCase = this._container.getInstance(HOLGetUsersInvolvementsUseCase.name);
    const data = await getAllUsersInvolvementsUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getHolUsersInvolvementsByIdHandler(request, h) {
    const getUsersInvolveByIdsUseCase = this._container.getInstance(HOLGetUsersInvolvementsByIdUseCase.name);
    const data = await getUsersInvolveByIdsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }

  async getHolDetailInvolvementsHandler(request, h) {
    try {
      const getDetailInvolveUseCase = this._container.getInstance(HOLGetDetailInvolvementsUseCase.name);
      const data = await getDetailInvolveUseCase.execute(request.params);
      const response = h.response({
        status: 'success',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async putHolUsersInvolvementsHandler(request, h) {
    try {
      const updateUsersInvolvementsUseCase = this._container.getInstance(HOLUpdateUsersInvolvementsUseCase.name);
      await updateUsersInvolvementsUseCase.execute(request.params, request.payload);
      const response = h.response({
        status: 'success',
        message: 'updated Involvements successfully',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteHolUsersInvolvementsHandler(request, h) {
    const deleteUsersInvolvementsUseCase = this._container.getInstance(HOLDeleteUsersInvolvementsUseCase.name);
    await deleteUsersInvolvementsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted Involvements successfully',
    });
    return response;
  }
}

module.exports = HolUsersInvolvementsHandler;
