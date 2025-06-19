const HOLCreateUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLCreateUsersAchievementsUseCase');
const HOLDeleteUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLDeleteUsersAchievementsUseCase');
const HOLGetUsersAchievementsByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLGetUsersAchievementsByIdUseCase');
const HOLGetUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLGetUsersAchievementsUseCase');
const HOLUpdateUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLUpdateUsersAchievementsUseCase');

class HolUsersAchievementsHandler {
  constructor(container) {
    this._container = container;
    this.postHolUsersAchievementsHandler = this.postHolUsersAchievementsHandler.bind(this);
    this.getHolUsersAchievementsHandler = this.getHolUsersAchievementsHandler.bind(this);
    this.getHolUsersAchievementsByIdHandler = this.getHolUsersAchievementsByIdHandler.bind(this);
    this.putHolUsersAchievementsHandler = this.putHolUsersAchievementsHandler.bind(this);
    this.deleteHolUsersAchievementsHandler = this.deleteHolUsersAchievementsHandler.bind(this);
  }
  async postHolUsersAchievementsHandler(request, h) {
    const createHolUsersAchievementsUseCase = this._container.getInstance(HOLCreateUsersAchievementsUseCase.name);
    await createHolUsersAchievementsUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added achievements successfully!',
    });
    response.code(201);
    return response;
  }
  async getHolUsersAchievementsHandler(request, h) {
    const getAllUsersAchievementsUseCase = this._container.getInstance(HOLGetUsersAchievementsUseCase.name);
    const data = await getAllUsersAchievementsUseCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async getHolUsersAchievementsByIdHandler(request, h) {
    const getUsersAchieveByIdsUseCase = this._container.getInstance(HOLGetUsersAchievementsByIdUseCase.name);
    const data = await getUsersAchieveByIdsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        data,
      },
    });
    return response;
  }
  async putHolUsersAchievementsHandler(request, h) {
    const updateUsersAchievementsUseCase = this._container.getInstance(HOLUpdateUsersAchievementsUseCase.name);
    await updateUsersAchievementsUseCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated achievements successfully',
    });
    return response;
  }
  async deleteHolUsersAchievementsHandler(request, h) {
    const deleteUsersAchievementsUseCase = this._container.getInstance(HOLDeleteUsersAchievementsUseCase.name);
    await deleteUsersAchievementsUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted achievements successfully',
    });
    return response;
  }
}

module.exports = HolUsersAchievementsHandler;
