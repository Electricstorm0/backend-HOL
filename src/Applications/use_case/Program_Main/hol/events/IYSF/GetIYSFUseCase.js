const GetIYSF = require('../../../../../../Domains/program_main/hol/events/events_detail/IYSF/entities/getIYSF');

class GetIYSFUseCase {
  constructor({ HOLEventsIYSFRepository }) {
    this._HOLEventsIYSFRepository = HOLEventsIYSFRepository;
  }

  async execute() {
    try {
      const events = await this._HOLEventsIYSFRepository.read(); // misal typeId: 1 untuk IYSF
      const result = await Promise.all(
        events.map(async (value) => ({
          ...new GetIYSF({
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

module.exports = GetIYSFUseCase;
