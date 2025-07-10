const HOLCreateUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLCreateUsersEventsUseCase');
const HOLDeleteUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLDeleteUsersEventsUseCase');
const HOLGetUsersEventsByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetUsersEventsByIdUseCase');
const HOLGetUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetUsersEventsUseCase');
const HOLGetUsersEventsByEventsIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetUsersEventsByEventsIdUseCase');
const HOLUpdateAttendeUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLUpdateAttendeUsersEventsUseCase');
const HOLUpdateStatusUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLUpdateStatusUsersEventsUseCase');
const HOLGetTotalUsersEventsByEventsTypeUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetTotalUsersEventsByEventsTypeUseCase');
const HOLGetTotalUsersEventsGroupByProgramUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetTotalUsersEventsGroupByProgramUseCase');
const HOLGetTotalUsersEventsByEventsIdAndStatusUseCase = require('../../../../../../../Applications/use_case/Program_Main/temp-HOL/Events/Users/HOLGetTotalUsersEventsByEventsIdAndStatusUseCase');
const autoBind = require('auto-bind');

class HolUsersEventsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postHolUsersEventsHandler(request, h) {
    try {
      const eventsHOLId = request.params.eventsHOLId;
      const usersHOLId = request.auth.credentials.id;

      const useCase = this._container.getInstance(HOLCreateUsersEventsUseCase.name);
      const data = await useCase.execute({ usersHOLId, eventsHOLId });

      const response = h.response({
        status: 'success',
        message: 'Berhasil mendaftar kegiatan.',
        data,
      });
      response.code(201);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async getHolUsersEventsHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersEventsUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getHolUsersEventsByIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersEventsByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
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
    const eventsHOLId = request.params.eventsHOLId;
    const usersHOLId = request.auth.credentials.id;

    const useCase = this._container.getInstance(HOLUpdateAttendeUsersEventsUseCase.name);
    await useCase.execute({ usersHOLId, eventsHOLId });

    const response = h.response({
      status: 'success',
      message: 'attendance successfully',
    });
    return response;
  }

  async putHolStatusUsersEventsHandler(request, h) {
    try {
      // const usersHOLId = request.params.usersHOLId;
      // const eventsHOLId = request.params.eventsHOLId;
      const useCase = this._container.getInstance(HOLUpdateStatusUsersEventsUseCase.name);
      await useCase.execute(request.params);

      const response = h.response({
        status: 'success',
        message: 'status updated  successfully',
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
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
