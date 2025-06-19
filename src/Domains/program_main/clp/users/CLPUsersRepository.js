/* eslint-disable no-unused-vars */
class CLPUsersRepository {
  async create() {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async update() {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async delete() {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readCountUsers({ batchId }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async read({ skip, numPerPage, batchId }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readById({ id }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readByUsersId({ id }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readyByBatchAndUsersId({ batchId, usersId }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readByDivisionInstitutionsId({ divisionInstitutionsId, usersId }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readAllByDivisionInstitutionsId({ id }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async readCountByDivisionInstitutionsId({ divisionInstitutionsId, usersId }) {
    throw new Error('CLP_USERS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CLPUsersRepository;
