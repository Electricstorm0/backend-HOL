const autoBind = require('auto-bind');
const HOLCreateRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLCreateRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetAllRecommendationByStatusUseCase');
const HOLGetAllUsersRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetAllUsersRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetRecommendationByUserIdUseCase');
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetTotalUsersRecomendationByStatusUseCase');
const HOLGetTotalUsersRecomendationUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetTotalUsersRecomendationUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLUpdateStatusRecommendationUseCase');

class HolRecommendationHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async postRecommendationHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateRecommendationUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.payload);
    const response = h.response({
      status: 'success',
      message: 'recommendation letter added successfully',
      data,
    });
    response.code(201);
    return response;
  }

  async getRecommendationByIdHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetRecommendationByIdUseCase.name);
    const data = await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getRecommendationByUserIdHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetRecommendationByUserIdUseCase.name);
    const data = await useCase.execute(request.auth.credentials);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getAllUsersRecommendationHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetAllUsersRecommendationUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getAllUsersRecommendationByStatusHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetAllRecommendationByStatusUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putRecommendationStatusHandler(request, h) {
    const useCase = await this._container.getInstance(HOLUpdateStatusRecommendationUseCase.name);
    await useCase.execute(request.params, request.auth.credentials, request.payload);
    const response = h.response({
      status: 'success',
      message: 'status updated successfully',
    });
    return response;
  }

  async getTotalUsersRecommendationHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetTotalUsersRecomendationUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getTotalUsersRecommendationByStatusHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetTotalUsersRecomendationByStatusUseCase.name);
    const data = await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }
}
module.exports = HolRecommendationHandler;
