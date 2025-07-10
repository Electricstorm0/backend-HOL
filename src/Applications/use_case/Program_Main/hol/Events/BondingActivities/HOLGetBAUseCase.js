const GetBA = require('../../../../../../Domains/program_main/hol/Events/EventsDetail/BondingActivities/entities/GetBA');

class GetBAUseCase {
  constructor({ HOLEventsRepository, HOLEventsBARepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute({ pageSize, page, holEventsTypeId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;
    const numRows = await this._HOLEventsRepository.readCountByProgramType({ holEventsTypeId });
    const numPages = Math.ceil(numRows / numPerPage);
    const events = await this._HOLEventsBARepository.read({ skip, numPerPage, holEventsTypeId }); // misal typeId: 1 untuk CFF
    const result = await Promise.all(
      events.map(async (value) => ({
        ...new GetBA({
          ...value,
        }),
      }))
    );
    return {
      ...numRows,
      result,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = GetBAUseCase;
