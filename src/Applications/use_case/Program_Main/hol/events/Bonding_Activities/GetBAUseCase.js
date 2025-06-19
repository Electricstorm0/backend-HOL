const GetBA = require('../../../../../../Domains/program_main/hol/events/events_detail/Bonding_Activities/entities/getBA');

class GetBAUseCase {
  constructor({ HOLEventsBARepository }) {
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute() {
    try {
      const events = await this._HOLEventsBARepository.read(); // misal typeId: 1 untuk CFF
      const result = await Promise.all(
        events.map(async (value) => ({
          ...new GetBA({
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

module.exports = GetBAUseCase;
