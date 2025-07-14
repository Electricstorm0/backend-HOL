class HOLCreateArticlesUseCase {
  constructor({ masterHOLArticlesRepository, holUsersArticlesRepository }) {
    this._masterHOLArticlesRepository = masterHOLArticlesRepository;
    this._holUsersArticlesRepository = holUsersArticlesRepository;
  }
  async execute({ id: usersHOLId }, payload) {
    const { title, abstract, fileUrl, citation, linkCitation } = payload;
    const articlesId = await this._masterHOLArticlesRepository.create({
      title,
      abstract,
      fileUrl,
      citation,
      linkCitation,
    });
    await this._holUsersArticlesRepository.create({
      articleId: articlesId,
      usersHOLId,
      status: 'Checking',
    });
    return articlesId;
  }
}

module.exports = HOLCreateArticlesUseCase;
