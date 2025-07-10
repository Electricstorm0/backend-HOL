const GetCFF = require('../../../../../../Domains/program_main/hol/temp-Events/events_detail/call_for_fellows/entities/GetCFF');

class GetCFFUseCase {
  constructor({ HOLEventsRepository, HOLEventsCFFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute({ pageSize, page, holEventsTypeId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;
    const numRows = await this._HOLEventsRepository.readCountByProgramType({ holEventsTypeId });
    const numPages = Math.ceil(numRows / numPerPage);
    const events = await this._HOLEventsCFFRepository.read({ skip, numPerPage, holEventsTypeId }); // misal typeId: 1 untuk CFF
    const result = await Promise.all(
      events.map(async (value) => ({
        ...new GetCFF({
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

module.exports = GetCFFUseCase;
