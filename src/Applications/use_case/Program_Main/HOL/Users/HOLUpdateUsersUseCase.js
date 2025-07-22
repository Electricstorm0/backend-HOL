const HOLUpdateUsers = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsers');
const HOLUpdateUsersDomicile = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsersDomicile');
const HOLUpdateUsersUniversities = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUsersUniversities');
// const HOLUpdateUniversities = require('../../../../../Domains/program_main/hol/users/entities/HOLUpdateUniversities');
const UpdateUsersDetail = require('../../../../../Domains/users/entities/UpdateUsersDetail');

class UpdateUsersUseCase {
  constructor({ holUsersRepository, usersDetailRepository, usersDomicileRepository, usersUniversitiesRepository }) {
    this._usersDetailRepository = usersDetailRepository;
    this._holUsersRepository = holUsersRepository;
    this._usersDomicileRepository = usersDomicileRepository;
    this._usersUniversitiesRepository = usersUniversitiesRepository;
  }

  async execute({ id: usersId }, payload) {
    const updateUsersDetail = new UpdateUsersDetail(payload);
    await this._usersDetailRepository.update({ id: usersId, payload: updateUsersDetail });

    const updateHOLUser = new HOLUpdateUsers(payload);
    const { id: usersHOLId } = updateHOLUser;
    await this._holUsersRepository.update({ id: usersHOLId, payload: updateHOLUser });

    const updateDomicileUsers = new HOLUpdateUsersDomicile(payload);
    const { id: usersDomicileId } = updateDomicileUsers;
    await this._usersDomicileRepository.update({ id: usersDomicileId, payload: updateDomicileUsers });

    const updateUsersUniversities = new HOLUpdateUsersUniversities(payload);
    const { id: usersUniversitiesId } = updateUsersUniversities;
    await this._usersUniversitiesRepository.update({ id: usersUniversitiesId, payload: updateUsersUniversities });
  }
}
module.exports = UpdateUsersUseCase;
