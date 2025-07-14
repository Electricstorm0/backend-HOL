const GetBA = require('../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

class GetBAByIdUseCase {
  constructor({ holEventsBARepository }) {
    this._holEventsBARepository = holEventsBARepository;
  }

  async execute({ id }) {
    const events = (await this._holEventsBARepository.readById({ id })) || {};
    const result = new GetBA({ ...events });

    return result;
  }
}

module.exports = GetBAByIdUseCase;
