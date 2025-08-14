/* eslint-disable no-unused-vars */
class HOLUsersEventsRepository {
  async readCountUsersEventsByEventsId({ eventsHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readCountUsersEventsByEventsTypeId({ holEventsTypeId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readCountUsersEventsGroupByProgram({ eventsHOLId, status }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readCountUsersEventsByEventsIdAndStatus({ eventsHOLId, status }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async create() {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async update() {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async updateAttendance({ usersHOLId, eventsHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async delete() {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readByUsersId({ usersId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async readByUsersIdAndStatus({ usersId, status }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readByUsersIdAndAttendance({ usersHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readUsersEventsByEventsId({ eventsHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkRegisteredUsersEvents({ usersHOLId, eventsHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async updateStatusUsersEvents({ usersHOLId, eventsHOLId }) {
    throw new Error('HOL_USERS_EVENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = HOLUsersEventsRepository;
