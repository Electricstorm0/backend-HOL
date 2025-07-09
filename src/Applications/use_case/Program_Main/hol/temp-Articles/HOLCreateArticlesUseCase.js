class HOLCreateArticlesUseCase {
  constructor({ MasterHOLArticlesRepository, HOLUsersArticlesRepository }) {
    this._MasterHOLArticlesRepository = MasterHOLArticlesRepository;
    this._HOLUsersArticlesRepository = HOLUsersArticlesRepository;
  }
  async execute({ usersHOLId }, payload) {
    try {
      const { title, abstract, fileUrl, citation, linkCitation } = payload;
      const articlesId = await this._MasterHOLArticlesRepository.create({
        title,
        abstract,
        fileUrl,
        citation,
        linkCitation,
      });
      await this._HOLUsersArticlesRepository.create({
        articleId: articlesId,
        usersHOLId,
        status: 'Checking',
      });
      return articlesId;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HOLCreateArticlesUseCase;
