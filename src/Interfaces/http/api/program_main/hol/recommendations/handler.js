const HOLCreateRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLCreateRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetAllRecommendationByStatusUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByUserIdUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLUpdateStatusRecommendationUseCase');

class HolRecommendationHandler {
  constructor(container) {
    this._container = container;
    this.postRecommendationHandler = this.postRecommendationHandler.bind(this);
    this.getRecommendationByIdHandler = this.getRecommendationByIdHandler.bind(this);
    this.getRecommendationByUserIdHandler = this.getRecommendationByUserIdHandler.bind(this);
    this.getAllUsersRecommendationHandler = this.getAllUsersRecommendationHandler.bind(this);
    this.putRecommendationStatusHandler = this.putRecommendationStatusHandler.bind(this);
  }

  async postRecommendationHandler(request, h) {
    try {
      const HOLUsersRecommendationId = request.auth.credentials.id;
      const useCase = this._container.getInstance(HOLCreateRecommendationUseCase.name);
      const data = await useCase.execute({ HOLUsersRecommendationId }, request.payload);
      return h
        .response({
          status: 'success',
          message: 'recommendation letter added successfully',
          data,
        })
        .code(201);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(400);
    }
  }

  async getRecommendationByIdHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetRecommendationByIdUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
  async getRecommendationByUserIdHandler(request, h) {
    const HOLUsersRecommendationId = request.auth.credentials.id;
    const useCase = await this._container.getInstance(HOLGetRecommendationByUserIdUseCase.name);
    const data = await useCase.execute({ HOLUsersRecommendationId });

    return h.response({
      status: 'success',
      data,
    });
  }

  async getAllUsersRecommendationHandler(request, h) {
    const useCase = await this._container.getInstance(HOLGetAllRecommendationByStatusUseCase.name);
    const data = await useCase.execute(request.query);

    return h.response({
      status: 'success',
      message: 'get all users recommendation successfully',
      data,
    });
  }

  async putRecommendationStatusHandler(request, h) {
    try {
      const updateBy = request.auth.credentials.id;
      const recommendationHolId = request.params.recommendationHolId;
      const updateData = await this._container.getInstance(HOLUpdateStatusRecommendationUseCase.name);
      const data = await updateData.execute({ updateBy, recommendationHolId }, request.payload);

      return h.response({
        status: 'success',
        message: 'status updated successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HolRecommendationHandler;
