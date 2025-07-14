const GetIYSF = require('../../../../../../Domains/program_main/hol/events/events_detail/iysf/entities/GetIYSF');

class GetIYSFUseCase {
  constructor({ holEventsRepository, holEventsIYSFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsIYSFRepository = holEventsIYSFRepository;
  }

  async execute({ pageSize, page, holEventsTypeId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._holEventsRepository.readCountByProgramType({ holEventsTypeId });
    const numPages = Math.ceil(numRows / numPerPage);
    const events = (await this._holEventsIYSFRepository.read({ skip, numPerPage, holEventsTypeId })) || [];
    const result = await Promise.all(
      events.map(async (value) => ({
        ...new GetIYSF({
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

module.exports = GetIYSFUseCase;
