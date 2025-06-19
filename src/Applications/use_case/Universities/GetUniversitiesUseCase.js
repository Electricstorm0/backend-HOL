class GetUniversitiesUseCase {
  constructor({ masterProvinciesRepository, universitiesRepository }) {
    this._masterProvinciesRepository = masterProvinciesRepository;
    this._universitiesRepository = universitiesRepository;
  }

  async execute(query) {
    const {
      pageSize,
      page,
    } = query;

    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._universitiesRepository.readCount();
    const numPages = Math.ceil(numRows / numPerPage);

    const universities = await this._universitiesRepository.read({ skip, numPerPage });

    return {
      universities,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = GetUniversitiesUseCase;
