const GetExp = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/entities/GetWorkExperience');

class HOLGetUsersWorkExpByUsersIdUseCase {
  constructor({ holUsersWorkExpRepository }) {
    this._holUsersWorkExpRepository = holUsersWorkExpRepository;
  }

  async execute({ id: usersHOLId }) {
    const exp = (await this._holUsersWorkExpRepository.readByUsersId({ usersHOLId })) || {};
    const result = await Promise.all(
      exp.map(async (value) => ({
        ...new GetExp({
          ...value,
        }),
      }))
    );
    return result;
  }
}

module.exports = HOLGetUsersWorkExpByUsersIdUseCase;
