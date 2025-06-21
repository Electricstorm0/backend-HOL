class HOLUpdateStatusArticleUseCase {
  constructor({ HOLUsersArticlesRepository }) {
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute({ id }, status) {
    const result = await this._HOLUsersArticlesRepository.updateStatusArticle({ id, status });
    return result;
  }
}
module.exports = HOLUpdateStatusArticleUseCase;
