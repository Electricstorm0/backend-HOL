const updateEvents = require('../../../../../../Domains/program_main/hol/events/entities/updateEvents');
const updateBA = require('../../../../../../Domains/program_main/hol/events/events_detail/Bonding_Activities/entities/updateBA');

class UpdateBAUseCase {
  constructor({ HOLEventsRepository, HOLEventsBARepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute({ id }, payload) {
    try {
      const updateEvent = new updateEvents(payload);
      await this._HOLEventsRepository.update({ id, payload: updateEvent });
      const updatedBA = new updateBA(payload);
      await this._HOLEventsBARepository.update({ id, payload: updatedBA });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = UpdateBAUseCase;
