const autoBind = require('auto-bind');
const CreateIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/IYSF/HOLCreateIYSFUseCase');
const DeleteIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/IYSF/HOLDeleteIYSFUseCase');
const GetIYSFByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/IYSF/HOLGetIYSFByIdUseCase');
const GetIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/IYSF/HOLGetIYSFUseCase');
const UpdateIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/IYSF/HOLUpdateIYSFUseCase');

class IYSFHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postIYSFHandler(request, h) {
    const useCase = this._container.getInstance(CreateIYSFUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data,
    });
    response.code(201);
    return response;
  }
  async getIYSFHandler(request, h) {
    const useCase = this._container.getInstance(GetIYSFUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getIYSFByIdHandler(request, h) {
    const useCase = this._container.getInstance(GetIYSFByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async putIYSFHandler(request, h) {
    const useCase = this._container.getInstance(UpdateIYSFUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated events successfully',
    });
    return response;
  }
  async deleteIYSFHandler(request, h) {
    const useCase = this._container.getInstance(DeleteIYSFUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = IYSFHandler;
