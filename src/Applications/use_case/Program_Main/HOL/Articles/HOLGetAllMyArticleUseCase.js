const HOLGetPublications = require('../../../../../Domains/program_main/hol/articles/entities/GetPublications');

class HOLGetAllMyArticleUseCase {
  constructor({ holUsersArticlesRepository }) {
    this._holUsersArticlesRepository = holUsersArticlesRepository;
  }
  async execute({ id: usersHOLId }) {
    const count = await this._holUsersArticlesRepository.readCountArticlesByUsersId({ usersHOLId });
    const article = (await this._holUsersArticlesRepository.readByUsersId({ usersHOLId })) || [];
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
