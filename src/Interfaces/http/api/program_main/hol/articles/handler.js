const HOLCreateArticlesUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLCreateArticlesUseCase');
const HOLDeleteArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLDeleteArticleUseCase');
const HOLGetAllArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLGetAllArticleUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLGetAllMyArticleUseCase');
const HOLGetAllUsersArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLGetAllUsersArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLUpdateArticleUseCase');
const HOLUpdateStatusArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/temp-Articles/HOLUpdateStatusArticleUseCase');

class HOLArticleHandler {
  constructor(container) {
    this._container = container;
    this.postArticleHandler = this.postArticleHandler.bind(this);
    this.getMyArticleHandler = this.getMyArticleHandler.bind(this);
    this.getDetailArticleHandler = this.getDetailArticleHandler.bind(this);
    this.getAllArticleHandler = this.getAllArticleHandler.bind(this);
    this.getAllUsersArticleHandler = this.getAllUsersArticleHandler.bind(this);
    this.putArticleHandler = this.putArticleHandler.bind(this);
    this.putStatusArticleHandler = this.putStatusArticleHandler.bind(this);
    this.deleteArticleHandler = this.deleteArticleHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      const usersHOLId = request.auth.credentials.id;
      const useCase = this._container.getInstance(HOLCreateArticlesUseCase.name);
      const data = await useCase.execute({ usersHOLId }, request.payload);

      const response = h.response({
        status: 'success',
        message: 'article added successfully!',
        data,
      });
      response.code(201);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetAllArticleUseCase.name);
      const data = await useCase.execute(request.query);

      const response = h.response({
        status: 'success',
        message: 'get articles successfully!',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUsersArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetAllUsersArticleUseCase.name);
      const data = await useCase.execute(request.query);

      const response = h.response({
        status: 'success',
        message: 'get users articles successfully!',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getMyArticleHandler(request, h) {
    try {
      const usersHOLId = request.auth.credentials.id;
      const useCase = this._container.getInstance(HOLGetAllMyArticleUseCase.name);
      const data = await useCase.execute({ usersHOLId });

      const response = h.response({
        status: 'success',
        message: 'get articles successfully!',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetDetailArticleUseCase.name);
      const data = await useCase.execute(request.params);

      const response = h.response({
        status: 'success',
        message: 'get articles successfully!',
        data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async putArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLUpdateArticleUseCase.name);
      await useCase.execute(request.params, request.payload);

      const response = h.response({
        status: 'success',
        message: 'article updated successfully!',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async putStatusArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLUpdateStatusArticleUseCase.name);
      const data = await useCase.execute(request.params, request.payload.status);
      const response = h.response({
        status: 'success',
        message: 'Status updated successfully!',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLDeleteArticleUseCase.name);
      await useCase.execute(request.params);

      const response = h.response({
        status: 'success',
        message: 'article deleted successfully!',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLArticleHandler;
