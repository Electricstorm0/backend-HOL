const autoBind = require('auto-bind');
const HOLCreateUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Achievements/HOLCreateUsersAchievementsUseCase');
const HOLDeleteUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Achievements/HOLDeleteUsersAchievementsUseCase');
const HOLGetUsersAchievementsByIdUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Achievements/HOLGetUsersAchievementsByIdUseCase');
const HOLGetUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Achievements/HOLGetUsersAchievementsUseCase');
const HOLUpdateUsersAchievementsUseCase = require('../../../../../../../../Applications/use_case/Program_Main/hol/Users/Journey/Achievements/HOLUpdateUsersAchievementsUseCase');

class HolUsersAchievementsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }
  async postHolUsersAchievementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateUsersAchievementsUseCase.name);
    const data = await useCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      message: 'added achievements successfully!',
      data,
    });
    response.code(201);
    return response;
  }
  async getHolUsersAchievementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersAchievementsUseCase.name);
    const data = await useCase.execute(request.query);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async getHolUsersAchievementsByIdHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetUsersAchievementsByIdUseCase.name);
    const data = await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
  async putHolUsersAchievementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateUsersAchievementsUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'updated achievements successfully',
    });
    return response;
  }
  async deleteHolUsersAchievementsHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteUsersAchievementsUseCase.name);
    await useCase.execute(request.params);
    const response = h.response({
      status: 'success',
      message: 'deleted achievements successfully',
    });
    return response;
  }
}

module.exports = HolUsersAchievementsHandler;
