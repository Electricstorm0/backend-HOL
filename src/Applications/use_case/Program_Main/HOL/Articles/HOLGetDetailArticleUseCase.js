const HOLGetDetailArticle = require('../../../../../Domains/program_main/hol/articles/entities/GetDetailArticle');

class HOLGetDetailArticleUseCase {
  constructor({ masterHOLArticlesRepository }) {
    this._masterHOLArticlesRepository = masterHOLArticlesRepository;
  }
  async execute({ id }) {
    const article = (await this._masterHOLArticlesRepository.readById({ id })) || {};
    const result = new HOLGetDetailArticle({ ...article });
    return result;
  }
}
module.exports = HOLGetDetailArticleUseCase;
