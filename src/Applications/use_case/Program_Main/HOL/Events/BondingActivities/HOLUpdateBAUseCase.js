const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/UpdateEvents');
const updateBA = require('../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/UpdateBA');

class UpdateBAUseCase {
  constructor({ HOLEventsRepository, HOLEventsBARepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute({ id }, payload) {
    const updateEvent = new updateEvents(payload);
    await this._HOLEventsRepository.update({ id, payload: updateEvent });
    const updatedBA = new updateBA(payload);
    await this._HOLEventsBARepository.update({ id, payload: updatedBA });
  }
}
module.exports = UpdateBAUseCase;
