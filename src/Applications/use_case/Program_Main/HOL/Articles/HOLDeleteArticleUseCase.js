class HOLDeleteArticleUseCase {
  constructor({ masterHOLArticlesRepository }) {
    this._masterHOLArticlesRepository = masterHOLArticlesRepository;
  }
  async execute({ id }) {
    const result = await this._masterHOLArticlesRepository.delete({ id });
    return result;
  }
}
module.exports = HOLDeleteArticleUseCase;
