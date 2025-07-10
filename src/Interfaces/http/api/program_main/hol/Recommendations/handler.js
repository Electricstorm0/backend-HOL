const autoBind = require('auto-bind');
const HOLCreateRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLCreateRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetAllRecommendationByStatusUseCase');
const HOLGetAllUsersRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetAllUsersRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetRecommendationByUserIdUseCase');
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetTotalUsersRecomendationByStatusUseCase');
const HOLGetTotalUsersRecomendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLGetTotalUsersRecomendationUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/Recommendations/HOLUpdateStatusRecommendationUseCase');

class HolRecommendationHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async postRecommendationHandler(request, h) {
    const HOLUsersRecommendationId = request.auth.credentials.id;
    const useCase = this._container.getInstance(HOLCreateRecommendationUseCase.name);
    const data = await useCase.execute({ HOLUsersRecommendationId }, request.payload);
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
    const HOLUsersRecommendationId = request.auth.credentials.id;
    const useCase = await this._container.getInstance(HOLGetRecommendationByUserIdUseCase.name);
    const data = await useCase.execute({ HOLUsersRecommendationId });

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
      message: 'get all users recommendation successfully',
      data,
    });
    return response;
  }
  async getAllUsersRecommendationByStatusHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetAllRecommendationByStatusUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      message: 'get all users recommendation successfully',
      data,
    });
    return response;
  }

  async putRecommendationStatusHandler(request, h) {
    const updateBy = request.auth.credentials.id;
    const recommendationHolId = request.params.recommendationHolId;
    const useCase = await this._container.getInstance(HOLUpdateStatusRecommendationUseCase.name);
    const data = await useCase.execute({ updateBy, recommendationHolId }, request.payload);

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
