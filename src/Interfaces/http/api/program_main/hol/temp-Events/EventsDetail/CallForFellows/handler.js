const CreateCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Events/CallForFellows/HOLCreateCFFUseCase');
const DeleteCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Events/CallForFellows/HOLDeleteCFFUseCase');
const GetCFFByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Events/CallForFellows/HOLGetCFFByIdUseCase');
const GetCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Events/CallForFellows/HOLGetCFFUseCase');
const UpdateCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Events/CallForFellows/HOLUpdateCFFUseCase');

class CFFHandler {
  constructor(container) {
    this._container = container;
    this.postCFFHandler = this.postCFFHandler.bind(this);
    this.getCFFHandler = this.getCFFHandler.bind(this);
    this.getCFFByIdHandler = this.getCFFByIdHandler.bind(this);
    this.putCFFHandler = this.putCFFHandler.bind(this);
    this.deleteCFFHandler = this.deleteCFFHandler.bind(this);
  }
  async postCFFHandler(request, h) {
    const useCase = this._container.getInstance(CreateCFFUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data,
    });
    response.code(201);
    return response;
  }
  async getCFFHandler(request, h) {
    const useCase = this._container.getInstance(GetCFFUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getCFFByIdHandler(request, h) {
    const useCase = this._container.getInstance(GetCFFByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async putCFFHandler(request, h) {
    const useCase = this._container.getInstance(UpdateCFFUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated events successfully',
    });
    return response;
  }
  async deleteCFFHandler(request, h) {
    const useCase = this._container.getInstance(DeleteCFFUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = CFFHandler;
