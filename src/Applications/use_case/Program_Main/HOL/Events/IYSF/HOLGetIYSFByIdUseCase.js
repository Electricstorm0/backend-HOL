const GetIYSF = require('../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

class GetIYSFByIdUseCase {
  constructor({ holEventsIYSFRepository }) {
    this._holEventsIYSFRepository = holEventsIYSFRepository;
  }

  async execute({ id }) {
    const events = (await this._holEventsIYSFRepository.readById({ id })) || {};
    const result = new GetIYSF({ ...events });
    return result;
  }
}

module.exports = GetIYSFByIdUseCase;
