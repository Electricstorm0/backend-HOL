const CLPUpdateUsers = require('../../../../../Domains/program_main/clp/users/entities/CLPUpdateUsers');
const CLPUpdateUsersDetail = require('../../../../../Domains/program_main/clp/users/entities/CLPUpdateUsersDetail');
const CLPUpdateUsersDomicile = require('../../../../../Domains/program_main/clp/users/entities/CLPUpdateUsersDomicile');
const CLPUpdateUsersUniversities = require('../../../../../Domains/program_main/clp/users/entities/CLPUpdateUsersUniversities');
const UpdateMasterUniversities = require('../../../../../Domains/universities/entities/UpdateMasterUniversities');
const UpdateUsersDetail = require('../../../../../Domains/users/entities/UpdateUsersDetail');

class CLPUpdateUsersDetailUseCase {
  constructor({
    usersDetailRepository, clpUsersRepository,
    usersUniversitiesRepository, usersDomicileRepository,
    masterUniversitiesRepository,
  }) {
    this._usersDetailRepository = usersDetailRepository;
    this._clpUsersRepository = clpUsersRepository;
    this._usersUniversitiesRepository = usersUniversitiesRepository;
    this._usersDomicileRepository = usersDomicileRepository;
    this._masterUniversitiesRepository = masterUniversitiesRepository;
  }

  async execute({ id: usersId }, payload) {
    const {
      usersCLPId, universities, domicile, firstName, lastName,
    } = payload;
    const data = new CLPUpdateUsersDetail(payload);

    const payloadUpdateUsersDetail = new UpdateUsersDetail(data);
    await this._usersDetailRepository.update({
      payload: payloadUpdateUsersDetail, id: usersId,
    });

    const payloadUpdateUsersCLP = new CLPUpdateUsers(data);
    await this._clpUsersRepository.update({
      payload: payloadUpdateUsersCLP, id: usersCLPId,
    });

    const payloadUpdateUsersUniversities = new CLPUpdateUsersUniversities(universities);
    const { id: usersUniverisitiesId } = payloadUpdateUsersUniversities;
    await this._usersUniversitiesRepository.update({ payload: payloadUpdateUsersUniversities, id: usersUniverisitiesId });

    const { universitiesId } = universities.universitiesDetail || {};
    const payloadUpdateUniversities = new UpdateMasterUniversities(universities.universitiesDetail);
    await this._masterUniversitiesRepository.update({ payload: payloadUpdateUniversities, id: universitiesId });

    domicile.forEach(async (value) => {
      const payloadUpdateUsersDomicile = new CLPUpdateUsersDomicile(value);
      const { id } = payloadUpdateUsersDomicile;
      await this._usersDomicileRepository.update({ payload: payloadUpdateUsersDomicile, id });
    });
    return {
      firstName, lastName,
    };
  }
}

module.exports = CLPUpdateUsersDetailUseCase;
