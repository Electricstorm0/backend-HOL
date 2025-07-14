const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateBA = require('../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/UpdateBA');

class UpdateBAUseCase {
  constructor({ holEventsRepository, holEventsBARepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsBARepository = holEventsBARepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._holEventsRepository.update({ id, payload: updateEvent });
    const updatedBA = new updateBA(payload);
    await this._holEventsBARepository.update({ id, payload: updatedBA });
  }
}
module.exports = UpdateBAUseCase;
