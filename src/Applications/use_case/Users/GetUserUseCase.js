class GetUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(query) {
    const {
      pageSize,
      page
    } = query;

    const numPerPage = parseInt(pageSize, 10) || 1;
    const offset = parseInt(page - 1, 10) || 0;

    const skip = offset * numPerPage;

    const numRows = await this._userRepository.getCountUsers();
    const numPages = Math.ceil(numRows / numPerPage)
    console.log('number of pages:', numPages);

    try {
      const users = await this._userRepository.getUsers(skip, numPerPage);

      if (page < numPages) {
        return {
          users,
          current: offset,
          perPage: numPerPage,
          previous: offset > 0 ? page - 1 : undefined,
          next: offset < numPages - 1 ? offset + 1 : undefined
        };
      } else {
        err: 'queried page ' + offset + ' is >= to maximum page number ' + numPages
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = GetUserUseCase;
