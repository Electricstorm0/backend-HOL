const HOLCreateUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLCreateUsersWorkExpUseCase');
const HOLGetUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLGetUsersWorkExpUseCase');
const HOLGetUsersWorkExpByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLGetUsersWorkExpByIdUseCase');
const HOLUpdateUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLUpdateUsersWorkExpUseCase');
const HOLDeleteUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLDeleteUsersWorkExpUseCase');

class HolUsersWorkExpHandler {
  constructor(container) {
    this._container = container;
    this.postHolUsersWorkExpHandler = this.postHolUsersWorkExpHandler.bind(this);
    this.getHolUsersWorkExpHandler = this.getHolUsersWorkExpHandler.bind(this);
    this.getHolUsersWorkExpByIdHandler = this.getHolUsersWorkExpByIdHandler.bind(this);
    this.putHolUsersWorkExpHandler = this.putHolUsersWorkExpHandler.bind(this);
    this.deleteHolUsersWorkExpHandler = this.deleteHolUsersWorkExpHandler.bind(this);
  }
  async postHolUsersWorkExpHandler(request, h) {
    const createHolUsersWorkExpUseCase = this._container.getInstance(HOLCreateUsersWorkExpUseCase.name);
    await createHolUsersWorkExpUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added work experience successfully!',
    });
    response.code(201);
    return response;
  }
  async getHolUsersWorkExpHandler(request, h) {
    const getAllUsersWorkExpUseCase = this._container.getInstance(HOLGetUsersWorkExpUseCase.name);
    const data = await getAllUsersWorkExpUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getHolUsersWorkExpByIdHandler(request, h) {
    const getUsersExpByIdsUseCase = this._container.getInstance(HOLGetUsersWorkExpByIdUseCase.name);
    const data = await getUsersExpByIdsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async putHolUsersWorkExpHandler(request, h) {
    const updateUsersWorkExpUseCase = this._container.getInstance(HOLUpdateUsersWorkExpUseCase.name);
    await updateUsersWorkExpUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated work experience successfully',
    });
    return response;
  }
  async deleteHolUsersWorkExpHandler(request, h) {
    const deleteUsersWorkExpUseCase = this._container.getInstance(HOLDeleteUsersWorkExpUseCase.name);
    await deleteUsersWorkExpUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted work experience successfully',
    });
    return response;
  }
}

module.exports = HolUsersWorkExpHandler;
