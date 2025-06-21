class HOLDeleteArticleUseCase {
  constructor({ MasterHOLArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
  }
  async execute({ id }) {
    const result = await this._MasterHOLArticlesRepository.delete({ id });
    return result;
  }
}
module.exports = HOLDeleteArticleUseCase;
