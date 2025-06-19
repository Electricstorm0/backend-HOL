const HOLCreateUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLCreateUsersEventsUseCase');
const HOLDeleteUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLDeleteUsersEventsUseCase');
const HOLGetUsersEventsByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetUsersEventsByIdUseCase');
const HOLGetUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetUsersEventsUseCase');
const HOLGetUsersEventsByEventsIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetUsersEventsByEventsIdUseCase');
const HOLUpdateAttendeUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLUpdateAttendeUsersEventsUseCase');
const HOLUpdateStatusUsersEventsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLUpdateStatusUsersEventsUseCase');
const HOLGetTotalUsersEventsByEventsTypeUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetTotalUsersEventsByEventsTypeUseCase');
const HOLGetTotalUsersEventsGroupByProgramUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetTotalUsersEventsGroupByProgramUseCase');
const HOLGetTotalUsersEventsByEventsIdAndStatusUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Users/HOLGetTotalUsersEventsByEventsIdAndStatusUseCase');

class HolUsersEventsHandler {
  constructor(container) {
    this._container = container;
    this.postHolUsersEventsHandler = this.postHolUsersEventsHandler.bind(this);
    // get data users events
    this.getHolUsersEventsHandler = this.getHolUsersEventsHandler.bind(this);
    this.getHolUsersEventsByIdHandler = this.getHolUsersEventsByIdHandler.bind(this);
    this.getHolUsersEventsByEventsIdHandler = this.getHolUsersEventsByEventsIdHandler.bind(this);
    // get total users events
    this.getTotalUsersEventsByEventsTypeHandler = this.getTotalUsersEventsByEventsTypeHandler.bind(this); //untuk itung total users berdasarkan tipe events
    this.getTotalUsersEventsGroupByProgramHandler = this.getTotalUsersEventsGroupByProgramHandler.bind(this); // untuk itung total users yang dikelompokkan berdasarkan program
    this.getTotalUsersEventsByEventsIdAndStatusHandler = this.getTotalUsersEventsByEventsIdAndStatusHandler.bind(this); // untuk itung total users events berdasarkan status dan events id nya

    // update data users events
    this.putHolAttendeUsersEventsHandler = this.putHolAttendeUsersEventsHandler.bind(this);
    this.putHolStatusUsersEventsHandler = this.putHolStatusUsersEventsHandler.bind(this);
    // delete users events
    this.deleteHolUsersEventsHandler = this.deleteHolUsersEventsHandler.bind(this);
  }
  async postHolUsersEventsHandler(request, h) {
    try {
      const eventsHOLId = request.params.eventsHOLId;
      const usersHOLId = request.auth.credentials.id;

      const createHolUsersUseCase = this._container.getInstance(HOLCreateUsersEventsUseCase.name);
      const addedUsers = await createHolUsersUseCase.execute({ usersHOLId, eventsHOLId });

      return h
        .response({
          status: 'success',
          message: 'Berhasil mendaftar kegiatan.',
          addedUsers,
        })
        .code(201);
    } catch (err) {
      return h
        .response({
          status: 'fail',
          message: err.message,
        })
        .code(400);
    }
  }
  async getHolUsersEventsHandler(request, h) {
    const getAllUsersEventsUseCase = this._container.getInstance(HOLGetUsersEventsUseCase.name);
    const data = await getAllUsersEventsUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getHolUsersEventsByIdHandler(request, h) {
    const getUsersEventByIdsUseCase = this._container.getInstance(HOLGetUsersEventsByIdUseCase.name);
    const data = await getUsersEventByIdsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }

  async getHolUsersEventsByEventsIdHandler(request, h) {
    const getAllUsersEventsStatusByEventsIdUseCase = this._container.getInstance(HOLGetUsersEventsByEventsIdUseCase.name);
    const data = await getAllUsersEventsStatusByEventsIdUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersEventsByEventsTypeHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsByEventsTypeUseCase.name);
    const total = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      total,
    });
  }
  async getTotalUsersEventsGroupByProgramHandler(request, h) {
    const { eventsHOLId } = request.params;
    const { status } = request.query;
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsGroupByProgramUseCase.name);
    const total = await useCase.execute({ eventsHOLId, status });

    return h.response({
      status: 'success',
      total,
    });
  }
  async getTotalUsersEventsByEventsIdAndStatusHandler(request, h) {
    const { eventsHOLId } = request.params;
    const { status } = request.query;
    const useCase = this._container.getInstance(HOLGetTotalUsersEventsByEventsIdAndStatusUseCase.name);
    const total = await useCase.execute({ eventsHOLId, status });

    return h.response({
      status: 'success',
      total,
    });
  }

  async putHolAttendeUsersEventsHandler(request, h) {
    const eventsHOLId = request.params.eventsHOLId;
    const usersHOLId = request.auth.credentials.id;

    const useCase = this._container.getInstance(HOLUpdateAttendeUsersEventsUseCase.name);
    await useCase.execute({ usersHOLId, eventsHOLId });

    return h.response({
      status: 'success',
      message: 'attendance successfully',
    });
  }

  async putHolStatusUsersEventsHandler(request, h) {
    try {
      // const usersHOLId = request.params.usersHOLId;
      // const eventsHOLId = request.params.eventsHOLId;
      const useCase = this._container.getInstance(HOLUpdateStatusUsersEventsUseCase.name);
      await useCase.execute(request.params);

      return h.response({
        status: 'success',
        message: 'status updated  successfully',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteHolUsersEventsHandler(request, h) {
    const deleteUsersEventsUseCase = this._container.getInstance(HOLDeleteUsersEventsUseCase.name);
    await deleteUsersEventsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted users successfully',
    });
    return response;
  }
}

module.exports = HolUsersEventsHandler;
