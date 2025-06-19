const CreateCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/CreateCFFUseCase');
const DeleteCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/DeleteCFFUseCase');
const GetCFFByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/GetCFFByIdUseCase');
const GetCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/GetCFFUseCase');
const UpdateCFFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/UpdateCFFUseCase');

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
    const createCFFUseCase = this._container.getInstance(CreateCFFUseCase.name);
    const addedCFF = await createCFFUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data: {
        addedCFF,
      },
    });
    response.code(201);
    return response;
  }
  async getCFFHandler(request, h) {
    const getAllCFFUseCase = this._container.getInstance(GetCFFUseCase.name);
    const cffData = await getAllCFFUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        cffData,
      },
    });
    return response;
  }
  async getCFFByIdHandler(request, h) {
    const getCFFByIdUseCase = this._container.getInstance(GetCFFByIdUseCase.name);
    const cffData = await getCFFByIdUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        cffData,
      },
    });
    return response;
  }
  async putCFFHandler(request, h) {
    const updateCFFUseCase = this._container.getInstance(UpdateCFFUseCase.name);
    await updateCFFUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated events successfully',
    });
    return response;
  }
  async deleteCFFHandler(request, h) {
    const deleteCFFUseCase = this._container.getInstance(DeleteCFFUseCase.name);
    await deleteCFFUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = CFFHandler;
