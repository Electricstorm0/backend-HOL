const HOLGetUsersMeDetail = require('../../../../../Domains/program_main/hol/users/entities/HOLGetUsersMeDetail');

class HOLGetUsersMeDetailUseCase {
  constructor({ HOLUsersRepository, CLPGetUsersMeDetailUseCase }) {
    this._HOLUsersRepository = HOLUsersRepository;
    this._CLPGetUsersMeDetailUseCase = CLPGetUsersMeDetailUseCase;
  }

  async execute({ id: usersId }, { batchId }) {
    try {
      const HOLUsers = await this._HOLUsersRepository.readById({ id: usersId });
      const CLPUsersDetail = await this._CLPGetUsersMeDetailUseCase.execute({ id: usersId }, { batchId });
      console.log(CLPUsersDetail);
      const data = {
        photoProfile: 'profileKu.JPG',
        ...HOLUsers,
        ...CLPUsersDetail,
      };
      return new HOLGetUsersMeDetail(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLGetUsersMeDetailUseCase;
