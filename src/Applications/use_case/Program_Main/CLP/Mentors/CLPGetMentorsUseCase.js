const CLPGetMentors = require('../../../../../Domains/program_main/clp/mentors/entities/CLPGetMentors');

class CLPGetMentorsUseCase {
  constructor({ cLPMentorsRepository, usersDetailRepository }) {
    this._cLPMentorsRepository = cLPMentorsRepository;
    this._usersDetailRepository = usersDetailRepository;
  }

  async execute({ pageSize, page, batchId }) {
    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._cLPMentorsRepository.readCount({ batchId });
    const numPages = Math.ceil(numRows / numPerPage);

    const allMentors = await this._cLPMentorsRepository.read({ skip, numPerPage, batchId });
    const mentors = await Promise.all(allMentors.map(async (value) => ({
      ...new CLPGetMentors({
        ...value,
        mentorsId: value.id,
        ...await this._usersDetailRepository.readById({ id: value.id_users }),
      }),
    })));

    return {
      mentors,
      current: offset,
      perPage: numPerPage,
      previous: offset > 0 ? page - 1 : undefined,
      next: offset < numPages - 1 ? offset + 1 : undefined,
    };
  }
}

module.exports = CLPGetMentorsUseCase;
