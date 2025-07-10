const NotFoundError = require('../../../../../../Commons/exceptions/NotFoundError');
const GetIYSF = require('../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

class GetIYSFByIdUseCase {
  constructor({ HOLEventsIYSFRepository }) {
    this._HOLEventsIYSFRepository = HOLEventsIYSFRepository;
  }

  async execute({ id }) {
    const events = await this._HOLEventsIYSFRepository.readById({ id }); // misal typeId: 1 untuk IYSF
    if (!events || events.length === 0) {
      throw new NotFoundError(`Data dengan id ${id} tidak ditemukan`);
    }
    const result = new GetIYSF({ ...events });

    return result;
  }
}

module.exports = GetIYSFByIdUseCase;
