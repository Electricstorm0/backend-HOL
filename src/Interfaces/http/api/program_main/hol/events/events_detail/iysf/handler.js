const CreateIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/IYSF/CreateIYSFUseCase');
const DeleteIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/IYSF/DeleteIYSFUseCase');
const GetIYSFByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/IYSF/GetIYSFByIdUseCase');
const GetIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/IYSF/GetIYSFUseCase');
const UpdateIYSFUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/IYSF/UpdateIYSFUseCase');

class IYSFHandler {
  constructor(container) {
    this._container = container;
    this.postIYSFHandler = this.postIYSFHandler.bind(this);
    this.getIYSFHandler = this.getIYSFHandler.bind(this);
    this.getIYSFByIdHandler = this.getIYSFByIdHandler.bind(this);
    this.putIYSFHandler = this.putIYSFHandler.bind(this);
    this.deleteIYSFHandler = this.deleteIYSFHandler.bind(this);
  }
  async postIYSFHandler(request, h) {
    const createIYSFUseCase = this._container.getInstance(CreateIYSFUseCase.name);
    const addedIYSF = await createIYSFUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data: {
        addedIYSF,
      },
    });
    response.code(201);
    return response;
  }
  async getIYSFHandler(request, h) {
    const getAllIYSFUseCase = this._container.getInstance(GetIYSFUseCase.name);
    const data = await getAllIYSFUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getIYSFByIdHandler(request, h) {
    const getIYSFByIdUseCase = this._container.getInstance(GetIYSFByIdUseCase.name);
    const data = await getIYSFByIdUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async putIYSFHandler(request, h) {
    const updateIYSFUseCase = this._container.getInstance(UpdateIYSFUseCase.name);
    await updateIYSFUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated events successfully',
    });
    return response;
  }
  async deleteIYSFHandler(request, h) {
    const deleteIYSFUseCase = this._container.getInstance(DeleteIYSFUseCase.name);
    await deleteIYSFUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = IYSFHandler;
