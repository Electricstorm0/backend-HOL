const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateCFF = require('../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/UpdateCFF');

class UpdateCFFUseCase {
  constructor({ HOLEventsRepository, HOLEventsCFFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._HOLEventsRepository.update({ id, payload: updateEvent });
    const updatedCFF = new updateCFF(payload);
    await this._HOLEventsCFFRepository.update({ id, payload: updatedCFF });
  }
}
module.exports = UpdateCFFUseCase;
