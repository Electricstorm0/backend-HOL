const HOLUpdateArticle = require('../../../../../Domains/program_main/hol/temp-Articles/entities/UpdateArticle');

class HOLUpdateArticleUseCase {
  constructor({ MasterHOLArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
  }
  async execute({ id }, payload) {
    const updatearticle = new HOLUpdateArticle(payload);
    await this._MasterHOLArticlesRepository.update({ id, payload: updatearticle });
  }
}
module.exports = HOLUpdateArticleUseCase;
