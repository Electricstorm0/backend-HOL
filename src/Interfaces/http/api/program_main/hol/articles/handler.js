const autoBind = require('auto-bind');
const HOLCreateArticlesUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLCreateArticlesUseCase');
const HOLDeleteArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLDeleteArticleUseCase');
const HOLGetAllArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllArticleUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllMyArticleUseCase');
const HOLGetAllUsersArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllUsersArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLUpdateArticleUseCase');
const HOLUpdateStatusArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLUpdateStatusArticleUseCase');

class HOLArticleHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async postArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLCreateArticlesUseCase.name);
    const data = await useCase.execute(request.auth.credentials, request.payload);

    const response = h.response({
      status: 'success',
      message: 'article added successfully!',
      data,
    });
    response.code(201);
    return response;
  }

  async getAllArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetAllArticleUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getAllUsersArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetAllUsersArticleUseCase.name);
    const data = await useCase.execute(request.query);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async getMyArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetAllMyArticleUseCase.name);
      const data = await useCase.execute(request.auth.credentials);

      const response = h.response({
        status: 'success',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getDetailArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLGetDetailArticleUseCase.name);
    const data = await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data,
    });
    return response;
  }

  async putArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateArticleUseCase.name);
    await useCase.execute(request.params, request.payload);

    const response = h.response({
      status: 'success',
      message: 'article updated successfully!',
    });
    return response;
  }

  async putStatusArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLUpdateStatusArticleUseCase.name);
    await useCase.execute(request.params, request.payload);
    const response = h.response({
      status: 'success',
      message: 'Status updated successfully!',
    });
    return response;
  }

  async deleteArticleHandler(request, h) {
    const useCase = this._container.getInstance(HOLDeleteArticleUseCase.name);
    await useCase.execute(request.params);

    const response = h.response({
      status: 'success',
      message: 'article deleted successfully!',
    });
    return response;
  }
}
module.exports = HOLArticleHandler;
