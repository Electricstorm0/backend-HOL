const HOLGetPublications = require('../../../../../Domains/program_main/hol/Articles/entities/GetPublications');
// use case untuk di fitur publikasi
class HOLGetAllArticleUseCase {
  constructor({ MasterHOLArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
  }
  async execute({ pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._MasterHOLArticlesRepository.readCountArticle();
    const numPages = Math.ceil(numRows / numPerPage);
    const article = await this._MasterHOLArticlesRepository.readAllByStatus({ skip, numPerPage });
    const result = await Promise.all(
      article.map(async (value) => ({
        ...new HOLGetPublications({
          ...value,
        }),
      }))
    );
    return {
      result,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}
module.exports = HOLGetAllArticleUseCase;
