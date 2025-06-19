const GetCFF = require('../../../../../../Domains/program_main/HOL/events/events_detail/Call_For_Fellows/entities/getCFF');

class GetCFFUseCase {
  constructor({ HOLEventsCFFRepository }) {
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute() {
    try {
      const events = await this._HOLEventsCFFRepository.read(); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        events.map(async (value) => ({
          ...new GetCFF({
            ...value,
          }),
        }))
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetCFFUseCase;
