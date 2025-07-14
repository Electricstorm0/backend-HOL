const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateCFF = require('../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/UpdateCFF');

class UpdateCFFUseCase {
  constructor({ holEventsRepository, holEventsCFFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsCFFRepository = holEventsCFFRepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._holEventsRepository.update({ id, payload: updateEvent });
    const updatedCFF = new updateCFF(payload);
    await this._holEventsCFFRepository.update({ id, payload: updatedCFF });
  }
}
module.exports = UpdateCFFUseCase;
