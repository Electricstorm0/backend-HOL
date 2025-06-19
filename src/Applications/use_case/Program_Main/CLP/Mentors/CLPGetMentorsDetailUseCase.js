const CLPGetMentorsDetail = require('../../../../../Domains/program_main/clp/mentors/entities/CLPGetMentorsDetail');

class CLPGetMentorsDetailUseCase {
  constructor({ cLPMentorsRepository, usersDetailRepository }) {
    this._cLPMentorsRepository = cLPMentorsRepository;
    this._usersDetailRepository = usersDetailRepository;
  }

  async execute({ id }) {
    const mentors = await this._cLPMentorsRepository.readById({ id });
    const { id_users: usersId } = mentors;
    const usersDetail = await this._usersDetailRepository.readById({ id: usersId });
    return {
      ...new CLPGetMentorsDetail(usersDetail),
    };
  }
}

module.exports = CLPGetMentorsDetailUseCase;
