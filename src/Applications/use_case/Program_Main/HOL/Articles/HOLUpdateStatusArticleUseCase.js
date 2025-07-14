class HOLUpdateStatusArticleUseCase {
  constructor({ holUsersArticlesRepository }) {
    this._holUsersArticlesRepository = holUsersArticlesRepository;
  }
  async execute({ id }, payload) {
    const { status } = payload;
    const result = await this._holUsersArticlesRepository.updateStatusArticle({ id, status });
    return result;
  }
}
module.exports = HOLUpdateStatusArticleUseCase;
