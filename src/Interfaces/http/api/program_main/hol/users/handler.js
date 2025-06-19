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
    const createHolUsersUseCase = this._container.getInstance(HOLCreateUsersUseCase.name);
    await createHolUsersUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added users successfully!',
    });
    response.code(201);
    return response;
  }
  async getHolUsersHandler(request, h) {
    const getAllUsersUseCase = this._container.getInstance(HOLGetUsersUseCase.name);
    const data = await getAllUsersUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getHolUsersByIdHandler(request, h) {
    const getUsersByIdsUseCase = this._container.getInstance(HOLGetUsersByIdUseCase.name);
    const data = await getUsersByIdsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getOwnUsersHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersMeUseCase.name);
    const data = await useCase.execute(request.auth.credentials);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getOwnUsersDetailHandler(request, h) {
    try {
      const { id: usersId, batchId } = request.auth.credentials;
      const useCase = this._container.getInstance(HOLGetUsersMeDetailUseCase.name);
      const data = await useCase.execute({ id: usersId }, { batchId });
      console.log(data);

      return h.response({
        status: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTotalUsersHolHandler(request, h) {
    const total = this._container.getInstance(HOLGetTotalUsersUseCase.name);
    const data = await total.execute(request.query);
    return h.response({
      status: 'success',
      data,
    });
  }

  async getTotalUsersHolByProgramHandler(request, h) {
    const total = this._container.getInstance(HOLGetTotalUsersByProgramUseCase.name);
    const data = await total.execute(request.query);
    return h.response({
      status: 'success',
      data,
    });
  }

  async putHolUsersHandler(request, h) {
    const updateUsersUseCase = this._container.getInstance(HOLUpdateUsersUseCase.name);
    await updateUsersUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated users successfully',
    });
    return response;
  }
  async deleteHolUsersHandler(request, h) {
    const deleteUsersUseCase = this._container.getInstance(HOLDeleteUsersUseCase.name);
    await deleteUsersUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted users successfully',
    });
    return response;
  }
}

module.exports = HolUsersHandler;
