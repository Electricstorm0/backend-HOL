const autoBind = require('auto-bind');
const CreateBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLCreateBAUseCase');
const DeleteBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLDeleteBAUseCase');
const GetBAByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLGetBAByIdUseCase');
const GetBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLGetBAUseCase');
const UpdateBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLUpdateBAUseCase');

class BAHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postBAHandler(request, h) {
    const useCase = this._container.getInstance(CreateBAUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data,
    });
    response.code(201);
    return response;
  }
  async getBAHandler(request, h) {
    const useCase = this._container.getInstance(GetBAUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getBAByIdHandler(request, h) {
    const useCase = this._container.getInstance(GetBAByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async putBAHandler(request, h) {
    const useCase = this._container.getInstance(UpdateBAUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: ' updated events successfully',
    });
    return response;
  }
  async deleteBAHandler(request, h) {
    const useCase = this._container.getInstance(DeleteBAUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = BAHandler;
