class HOLDeleteUsersInvolvementsUseCase {
  constructor({ HOLUsersInvolvementsRepository }) {
    this._HOLUsersInvolvementsRepository = HOLUsersInvolvementsRepository;
  }

  async execute({ id }) {
    const Involve = await this._HOLUsersInvolvementsRepository.delete({ id });
    return Involve;
  }
}
module.exports = HOLDeleteUsersInvolvementsUseCase;
