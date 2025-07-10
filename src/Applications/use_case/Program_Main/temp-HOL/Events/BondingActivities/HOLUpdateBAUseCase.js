const updateEvents = require('../../../../../../Domains/program_main/hol/Events/entities/UpdateEvents');
const updateBA = require('../../../../../../Domains/program_main/hol/Events/EventsDetail/BondingActivities/entities/UpdateBA');

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
