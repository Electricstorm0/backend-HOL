const HOLGetUsersMeDetail = require('../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMeDetail');

class HOLGetUsersMeDetailUseCase {
  constructor({ holUsersRepository, clpGetUsersMeDetailUseCase }) {
    this._holUsersRepository = holUsersRepository;
    this._clpGetUsersMeDetailUseCase = clpGetUsersMeDetailUseCase;
  }

  async execute({ id: usersId }, { batchId }) {
    const HOLUsers = await this._holUsersRepository.readById({ id: usersId });
    const CLPUsersDetail = await this._clpGetUsersMeDetailUseCase.execute({ id: usersId }, { batchId });
    const data = {
      photoProfile: 'profileKu.JPG',
      ...HOLUsers,
      ...CLPUsersDetail,
    };
    return new HOLGetUsersMeDetail(data);
  }
}

module.exports = HOLGetUsersMeDetailUseCase;
