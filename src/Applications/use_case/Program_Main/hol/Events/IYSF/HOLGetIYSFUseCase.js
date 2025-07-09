const GetIYSF = require('../../../../../../Domains/program_main/hol/temp-Events/EventsDetail/IYSF/entities/GetIYSF');

class GetIYSFUseCase {
  constructor({ HOLEventsRepository, HOLEventsIYSFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsIYSFRepository = HOLEventsIYSFRepository;
  }

  async execute({ pageSize, page, holEventsTypeId }) {
    try {
      const numPerPage = parseInt(pageSize, 10) || 1;
      const offset = parseInt(page - 1, 10) || 0;

      const skip = offset * numPerPage;
      const numRows = await this._HOLEventsRepository.readCountByProgramType({ holEventsTypeId });
      const numPages = Math.ceil(numRows / numPerPage);
      const events = await this._HOLEventsIYSFRepository.read({ skip, numPerPage, holEventsTypeId }); // misal typeId: 1 untuk IYSF
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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetIYSFUseCase;
