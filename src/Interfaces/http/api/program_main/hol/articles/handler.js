const HOLCreateArticlesUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/articles/HOLCreateArticlesUseCase');
const HOLDeleteArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/articles/HOLDeleteArticleUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/articles/HOLGetAllMyArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../../Applications/use_case/Program_Main/hol/articles/HOLUpdateArticleUseCase');

class HOLArticleHandler {
  constructor(container) {
    this._container = container;
    this.postArticleHandler = this.postArticleHandler.bind(this);
    this.getMyArticleHandler = this.getMyArticleHandler.bind(this);
    this.getDetailArticleHandler = this.getDetailArticleHandler.bind(this);
    this.updateArticleHandler = this.updateArticleHandler.bind(this);
    this.deleteArticleHandler = this.deleteArticleHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      const usersHOLId = request.auth.credentials.id;
      const useCase = this._container.getInstance(HOLCreateArticlesUseCase.name);
      const data = await useCase.execute({ usersHOLId }, request.payload);

      return h
        .response({
          status: 'success',
          message: 'article added successfully!',
          data,
        })
        .code(201);
    } catch (error) {
      console.log(error);
    }
  }
  async getMyArticleHandler(request, h) {
    try {
      const usersHOLId = request.auth.credentials.id;
      const useCase = this._container.getInstance(HOLGetAllMyArticleUseCase.name);
      const data = await useCase.execute({ usersHOLId });

      return h.response({
        status: 'success',
        message: 'get articles successfully!',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLGetDetailArticleUseCase.name);
      const data = await useCase.execute(request.params);

      return h.response({
        status: 'success',
        message: 'get articles successfully!',
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updateArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLUpdateArticleUseCase.name);
      await useCase.execute(request.params, request.payload);

      return h.response({
        status: 'success',
        message: 'article updated successfully!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteArticleHandler(request, h) {
    try {
      const useCase = this._container.getInstance(HOLDeleteArticleUseCase.name);
      await useCase.execute(request.params);

      return h.response({
        status: 'success',
        message: 'article deleted successfully!',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = HOLArticleHandler;
