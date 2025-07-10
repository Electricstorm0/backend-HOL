const HOLGetPublications = require('../../../../../Domains/program_main/hol/articles/entities/GetPublications');

class HOLGetAllUsersArticleUseCase {
  constructor({ HOLUsersArticlesRepository }) {
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute({ pageSize, page }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;
    const skip = offset * numPerPage;
    const numRows = await this._HOLUsersArticlesRepository.readCountUsersArticle();
    const numPages = Math.ceil(numRows / numPerPage);
    const usersArticle = await this._HOLUsersArticlesRepository.read({ skip, numPerPage });
    const result = await Promise.all(
      usersArticle.map(async (value) => ({
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
module.exports = HOLGetAllUsersArticleUseCase;
