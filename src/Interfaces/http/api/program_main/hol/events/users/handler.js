const HOLCreateUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLCreateUsersEventsUseCase');
const HOLDeleteUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLDeleteUsersEventsUseCase');
const HOLGetUsersEventByUsersIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsByUsersIdUseCase');
const HOLGetUsersEventsByEventsIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsByEventsIdUseCase');
const HOLUpdateAttendeUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLUpdateAttendeUsersEventsUseCase');
const HOLUpdateStatusUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLUpdateStatusUsersEventsUseCase');
const HOLGetTotalUsersEventsByEventsTypeUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsByEventsTypeUseCase');
const HOLGetTotalUsersEventsGroupByProgramUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsGroupByProgramUseCase');
const HOLGetTotalUsersEventsByEventsIdAndStatusUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsByEventsIdAndStatusUseCase');
const autoBind = require('auto-bind');
const HOLGetUsersEventsStatusByUsersIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsStatusByUsersIdUseCase');

class HolUsersEventsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postHolUsersEventsHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateUsersEventsUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.params);

    const response = h.response({
      status: 'success',
      message: 'Register Event Successfully',
      data,
    });
    response.code(201);
    return response;
  }

  async getHolUsersEventsByUsersIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersEventByUsersIdUseCase.name);
    const data = await useCase.execute(request.auth.credentials);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getHolUsersEventsStatusByUsersIdHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetUsersEventsStatusByUsersIdUseCase.name);
      const data = await useCase.execute(request.auth.credentials);
      const response = h.response({
        status: 'success',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getHolUsersEventsByEventsIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersEventsByEventsIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersEventsByEventsTypeHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsByEventsTypeUseCase.name);
    const data = await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersEventsGroupByProgramHandler(request, h) {
    const { eventsHOLId } = request.params;
    const { status } = request.query;
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsGroupByProgramUseCase.name);
    const data = await useCase.execute({ eventsHOLId, status });

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersEventsByEventsIdAndStatusHandler(request, h) {
    const { eventsHOLId } = request.params;
    const { status } = request.query;
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsByEventsIdAndStatusUseCase.name);
    const data = await useCase.execute({ eventsHOLId, status });

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putHolAttendeUsersEventsHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateAttendeUsersEventsUseCase.name);
    await useCase.execute(request.auth.credentials, request.params);

    const response = h.response({
      status: 'success',
      message: 'attendance successfully',
    });
    return response;
  }

  async putHolStatusUsersEventsHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateStatusUsersEventsUseCase.name);
    await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      message: 'status updated  successfully',
    });
    return response;
  }

  async deleteHolUsersEventsHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteUsersEventsUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted users successfully',
    });
    return response;
  }
}

module.exports = HolUsersEventsHandler;
