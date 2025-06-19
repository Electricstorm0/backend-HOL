/* eslint-disable no-unused-vars */
class HOLEventsRepository {
  async create() {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async update() {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async delete() {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async read() {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readById({ id }) {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readEventsTypeByEventsId({ eventsHOLId }) {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readCountByProgramType({ holEventsTypeId }) {
    throw new Error('HOL_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = HOLEventsRepository;
