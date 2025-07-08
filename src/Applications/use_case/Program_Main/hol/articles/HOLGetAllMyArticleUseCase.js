const HOLGetPublications = require('../../../../../Domains/program_main/hol/articles/entities/getPublications');

class HOLGetAllMyArticleUseCase {
  constructor({ HOLUsersArticlesRepository }) {
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute({ usersHOLId }) {
    const count = await this._HOLUsersArticlesRepository.readCountArticlesByUsersId({ usersHOLId });
    const article = await this._HOLUsersArticlesRepository.readByUsersId({ usersHOLId });
    const result = await Promise.all(
      article.map(async (value) => ({
        ...new HOLGetPublications({
          ...value,
        }),
      }))
    );
    return {
      ...count,
      result,
    };
  }
}
module.exports = HOLGetAllMyArticleUseCase;
