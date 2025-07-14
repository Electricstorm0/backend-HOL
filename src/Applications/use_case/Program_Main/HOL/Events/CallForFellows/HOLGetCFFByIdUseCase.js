const GetCFF = require('../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/entities/GetCFF');

class GetCFFByIdUseCase {
  constructor({ holEventsCFFRepository }) {
    this._holEventsCFFRepository = holEventsCFFRepository;
  }

  async execute({ id }) {
    const events = (await this._holEventsCFFRepository.readById({ id })) || {};
    const result = new GetCFF({ ...events });

    return result;
  }
}

module.exports = GetCFFByIdUseCase;
