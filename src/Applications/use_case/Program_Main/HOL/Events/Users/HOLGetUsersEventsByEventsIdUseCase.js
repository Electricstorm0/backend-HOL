const GetUsersEvents = require('../../../../../../Domains/program_main/hol/events/entities/GetUsersEvents');

class HOLGetUsersEventsByEventsIdUseCase {
  constructor({ holUsersEventsRepository }) {
    this._holUsersEventsRepository = holUsersEventsRepository;
  }

  async execute({ pageSize, page, eventsHOLId }) {
    const numPerPage = parseInt(pageSize, 10) || 10;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * numPerPage;

    const countResult = await this._holUsersEventsRepository.readCountUsersEventsByEventsId({ eventsHOLId });
    const numRows = countResult.total_users_registrations;
    const numPages = Math.ceil(numRows / numPerPage);

    const users =
      (await this._holUsersEventsRepository.readUsersEventsByEventsId({
        skip,
        numPerPage,
        eventsHOLId,
      })) || [];

    const result = await Promise.all(
      users.map(async (value) => ({
        ...new GetUsersEvents({
          ...value,
        }),
      }))
    );

    return {
      result,
      current: currentPage,
      perPage: numPerPage,
      total: numRows,
      previous: currentPage > 1 ? currentPage - 1 : undefined,
      next: currentPage < numPages ? currentPage + 1 : undefined,
    };
  }
}

module.exports = HOLGetUsersEventsByEventsIdUseCase;
