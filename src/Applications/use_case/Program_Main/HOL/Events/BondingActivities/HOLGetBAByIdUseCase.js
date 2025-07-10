const NotFoundError = require('../../../../../../Commons/exceptions/NotFoundError');
const GetBA = require('../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

class GetBAByIdUseCase {
  constructor({ HOLEventsBARepository }) {
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute({ id }) {
    const events = await this._HOLEventsBARepository.readById({ id });
    if (!events || events.length === 0) {
      throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`);
    }
    const result = new GetBA({ ...events });

    return result;
  }
}

module.exports = GetBAByIdUseCase;
