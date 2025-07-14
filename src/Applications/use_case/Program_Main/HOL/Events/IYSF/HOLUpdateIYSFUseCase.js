const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateIYSF = require('../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/UpdateIYSF');

class UpdateIYSFUseCase {
  constructor({ holEventsRepository, holEventsIYSFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsIYSFRepository = holEventsIYSFRepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._holEventsRepository.update({ id, payload: updateEvent });
    const updatedIYSF = new updateIYSF(payload);
    await this._holEventsIYSFRepository.update({ id, payload: updatedIYSF });
  }
}
module.exports = UpdateIYSFUseCase;
