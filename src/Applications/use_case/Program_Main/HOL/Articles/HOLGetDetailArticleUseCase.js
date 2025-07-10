const HOLGetDetailArticle = require('../../../../../Domains/program_main/hol/articles/entities/GetDetailArticle');

class HOLGetDetailArticleUseCase {
  constructor({ MasterHOLArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
  }
  async execute({ id }) {
    const article = await this._MasterHOLArticlesRepository.readById({ id });
    const result = new HOLGetDetailArticle({ ...article });
    return result;
  }
}
module.exports = HOLGetDetailArticleUseCase;
