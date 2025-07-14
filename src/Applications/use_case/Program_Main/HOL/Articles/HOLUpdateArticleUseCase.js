const HOLUpdateArticle = require('../../../../../Domains/program_main/hol/articles/entities/UpdateArticle');

class HOLUpdateArticleUseCase {
  constructor({ masterHOLArticlesRepository }) {
    this._masterHOLArticlesRepository = masterHOLArticlesRepository;
  }
  async execute({ id }, payload) {
    const updatearticle = new HOLUpdateArticle(payload);
    await this._masterHOLArticlesRepository.update({ id, payload: updatearticle });
  }
}
module.exports = HOLUpdateArticleUseCase;
