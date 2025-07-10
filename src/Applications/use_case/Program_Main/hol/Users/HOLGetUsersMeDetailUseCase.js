const HOLGetUsersMeDetail = require('../../../../../Domains/program_main/hol/Users/entities/HOLGetUsersMeDetail');

class HOLGetUsersMeDetailUseCase {
  constructor({ HOLUsersRepository, CLPGetUsersMeDetailUseCase }) {
    this._HOLUsersRepository = HOLUsersRepository;
    this._CLPGetUsersMeDetailUseCase = CLPGetUsersMeDetailUseCase;
  }

  async execute({ id: usersId }, { batchId }) {
    const HOLUsers = await this._HOLUsersRepository.readById({ id: usersId });
    const CLPUsersDetail = await this._CLPGetUsersMeDetailUseCase.execute({ id: usersId }, { batchId });
    console.log(CLPUsersDetail);
    const data = {
      photoProfile: 'profileKu.JPG',
      ...HOLUsers,
      ...CLPUsersDetail,
    };
    return new HOLGetUsersMeDetail(data);
  }
}

module.exports = HOLGetUsersMeDetailUseCase;
