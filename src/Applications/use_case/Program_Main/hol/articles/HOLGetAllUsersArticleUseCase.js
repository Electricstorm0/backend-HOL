const HOLGetPublications = require('../../../../../Domains/program_main/hol/articles/entities/getPublications');

class HOLGetAllUsersArticleUseCase {
  constructor({ HOLUsersArticlesRepository }) {
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute() {
    const usersArticle = await this._HOLUsersArticlesRepository.read();
    const result = await Promise.all(
      usersArticle.map(async (value) => ({
        ...new HOLGetPublications({
          ...value,
        }),
      }))
    );
    return result;
  }
}
module.exports = HOLGetAllUsersArticleUseCase;
