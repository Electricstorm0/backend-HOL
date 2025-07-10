const GetUsersEvents = require('../../../../../../Domains/program_main/hol/events/entities/getUsersEvents');

class HOLGetUsersEventsByEventsIdUseCase {
  constructor({ HOLUsersEventsRepository }) {
    this._HOLUsersEventsRepository = HOLUsersEventsRepository;
  }

  async execute({ pageSize, page, eventsHOLId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._HOLUsersEventsRepository.readCountUsersEventsByEventsId({ eventsHOLId });
    const numPages = Math.ceil(numRows / numPerPage);
    const users = await this._HOLUsersEventsRepository.readUsersEventsByEventsId({ skip, numPerPage, eventsHOLId });
    const result = await Promise.all(
      users.map(async (value) => ({
        ...new GetUsersEvents({
          ...value,
        }),
      }))
    );
    return {
      result,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = HOLGetUsersEventsByEventsIdUseCase;
