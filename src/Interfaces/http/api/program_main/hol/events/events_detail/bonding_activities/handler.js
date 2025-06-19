const CreateBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/CreateBAUseCase');
const DeleteBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/DeleteBAUseCase');
const GetBAByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/GetBAByIdUseCase');
const GetBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/GetBAUseCase');
const UpdateBAUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/UpdateBAUseCase');

class BAHandler {
  constructor(container) {
    this._container = container;
    this.postBAHandler = this.postBAHandler.bind(this);
    this.getBAHandler = this.getBAHandler.bind(this);
    this.getBAByIdHandler = this.getBAByIdHandler.bind(this);
    this.putBAHandler = this.putBAHandler.bind(this);
    this.deleteBAHandler = this.deleteBAHandler.bind(this);
  }
  async postBAHandler(request, h) {
    const createBAUseCase = this._container.getInstance(CreateBAUseCase.name);
    const addedActivities = await createBAUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added events successfully!',
      data: {
        addedActivities,
      },
    });
    response.code(201);
    return response;
  }
  async getBAHandler(request, h) {
    const getAllBAUseCase = this._container.getInstance(GetBAUseCase.name);
    const data = await getAllBAUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getBAByIdHandler(request, h) {
    const getBAByIdUseCase = this._container.getInstance(GetBAByIdUseCase.name);
    const data = await getBAByIdUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async putBAHandler(request, h) {
    const updatedBAUseCase = this._container.getInstance(UpdateBAUseCase.name);
    await updatedBAUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: ' updated events successfully',
    });
    return response;
  }
  async deleteBAHandler(request, h) {
    const deleteBAUseCase = this._container.getInstance(DeleteBAUseCase.name);
    await deleteBAUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted events successfully',
    });
    return response;
  }
}

module.exports = BAHandler;
