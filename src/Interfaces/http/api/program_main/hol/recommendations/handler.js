const HOLCreateRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLCreateRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetAllRecommendationByStatusUseCase');
const HOLGetAllUsersRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetAllUsersRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByUserIdUseCase');
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetTotalUsersRecomendationByStatusUseCase');
const HOLGetTotalUsersRecomendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetTotalUsersRecomendationUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLUpdateStatusRecommendationUseCase');

class HolRecommendationHandler {
  constructor(container) {
    this._container = container;
    this.postRecommendationHandler = this.postRecommendationHandler.bind(this);
    this.getTotalUsersRecommendationHandler = this.getTotalUsersRecommendationHandler.bind(this);
    this.getTotalUsersRecommendationByStatusHandler = this.getTotalUsersRecommendationByStatusHandler.bind(this);
    this.getRecommendationByIdHandler = this.getRecommendationByIdHandler.bind(this);
    this.getRecommendationByUserIdHandler = this.getRecommendationByUserIdHandler.bind(this);
    this.getAllUsersRecommendationHandler = this.getAllUsersRecommendationHandler.bind(this);
    this.getAllUsersRecommendationByStatusHandler = this.getAllUsersRecommendationByStatusHandler.bind(this);
    this.putRecommendationStatusHandler = this.putRecommendationStatusHandler.bind(this);
  }

  async postRecommendationHandler(request, h) {
    try {
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
    } catch (error) {
      console.log(error);
    }
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
    try {
      const updateBy = request.auth.credentials.id;
      const recommendationHolId = request.params.recommendationHolId;
      const useCase = await this._container.getInstance(HOLUpdateStatusRecommendationUseCase.name);
      const data = await useCase.execute({ updateBy, recommendationHolId }, request.payload);

      const response = h.response({
        status: 'success',
        message: 'status updated successfully',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getTotalUsersRecommendationHandler(request, h) {
    try {
      const useCase = await this._container.getInstance(HOLGetTotalUsersRecomendationUseCase.name);
      const data = await useCase.execute(request.query);

      const response = h.response({
        status: 'success',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
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
