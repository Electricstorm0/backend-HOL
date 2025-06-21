const HOLGetPublications = require('../../../../../Domains/program_main/hol/articles/entities/getPublications');
// use case untuk di fitur publikasi
class HOLGetAllArticleUseCase {
  constructor({ MasterHOLArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
  }
  async execute() {
    const article = await this._MasterHOLArticlesRepository.readAllByStatus();
    const result = await Promise.all(
      article.map(async (value) => ({
        ...new HOLGetPublications({
          ...value,
        }),
      }))
    );
    return result;
  }
}
module.exports = HOLGetAllArticleUseCase;
