const CLPGetUsersByDivisionInstitutions = require('../../../../../Domains/program_main/clp/users/entities/CLPGetUsersByDivisionInstitutions');

class CLPGetUsersByDivisionInstitutionsUseCase {
  constructor({
    cLPUsersRepository, usersDetailRepository,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._usersDetailRepository = usersDetailRepository;
  }

  async execute({ id }) {
    const users = await this._cLPUsersRepository.readAllByDivisionInstitutionsId({ id });
    const data = await Promise.all(users.map(async (value) => ({
      ...new CLPGetUsersByDivisionInstitutions({ ...await this._usersDetailRepository.readById({ id: value.id_users }) }),
    })));
    return data;
  }
}

module.exports = CLPGetUsersByDivisionInstitutionsUseCase;
