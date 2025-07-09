const updateEvents = require('../../../../../../Domains/program_main/hol/temp-Events/entities/UpdateEvents');
const updateIYSF = require('../../../../../../Domains/program_main/hol/temp-Events/EventsDetail/IYSF/entities/UpdateIYSF');

class UpdateIYSFUseCase {
  constructor({ HOLEventsRepository, HOLEventsIYSFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsIYSFRepository = HOLEventsIYSFRepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._HOLEventsRepository.update({ id, payload: updateEvent });
    const updatedIYSF = new updateIYSF(payload);
    await this._HOLEventsIYSFRepository.update({ id, payload: updatedIYSF });
  }
}
module.exports = UpdateIYSFUseCase;
