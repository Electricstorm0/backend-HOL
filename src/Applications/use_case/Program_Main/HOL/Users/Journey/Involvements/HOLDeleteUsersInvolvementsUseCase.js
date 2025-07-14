class HOLDeleteUsersInvolvementsUseCase {
  constructor({ holUsersInvolvementsRepository }) {
    this._holUsersInvolvementsRepository = holUsersInvolvementsRepository;
  }

  async execute({ id }) {
    const Involve = await this._holUsersInvolvementsRepository.delete({ id });
    return Involve;
  }
}
module.exports = HOLDeleteUsersInvolvementsUseCase;
