const GetBA = require('../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/entities/GetBA');

class GetBAUseCase {
  constructor({ holEventsRepository, holEventsBARepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsBARepository = holEventsBARepository;
  }

  async execute({ pageSize, page, holEventsTypeId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._holEventsRepository.readCountByProgramType({ holEventsTypeId });
    const numPages = Math.ceil(numRows / numPerPage);
    const events = (await this._holEventsBARepository.read({ skip, numPerPage, holEventsTypeId })) || [];
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
