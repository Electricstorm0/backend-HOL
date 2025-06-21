const HOLGetMyResearch = require('../../../../../Domains/program_main/hol/articles/entities/getMyResearch');

class HOLGetAllMyArticleUseCase {
  constructor({ HOLUsersArticlesRepository }) {
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute({ usersHOLId }) {
    const article = await this._HOLUsersArticlesRepository.readByUsersId({ usersHOLId });
    const result = await Promise.all(
      article.map(async (value) => ({
        ...new HOLGetMyResearch({
          ...value,
        }),
      }))
    );
    return result;
  }
}
module.exports = HOLGetAllMyArticleUseCase;
