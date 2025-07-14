const HOLCreateUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLCreateUsersWorkExpUseCase');
const HOLGetUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLGetUsersWorkExpUseCase');
const HOLGetUsersWorkExpByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLGetUsersWorkExpByIdUseCase');
const HOLUpdateUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLUpdateUsersWorkExpUseCase');
const HOLDeleteUsersWorkExpUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLDeleteUsersWorkExpUseCase');
const autoBind = require('auto-bind');

class HolUsersWorkExpHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async postHolUsersWorkExpHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateUsersWorkExpUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added work experience successfully!',
      data,
    });
    response.code(201);
    return response;
  }

  async getHolUsersWorkExpHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersWorkExpUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getHolUsersWorkExpByIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersWorkExpByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putHolUsersWorkExpHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateUsersWorkExpUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated work experience successfully',
    });
    return response;
  }

  async deleteHolUsersWorkExpHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteUsersWorkExpUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted work experience successfully',
    });
    return response;
  }
}

module.exports = HolUsersWorkExpHandler;
