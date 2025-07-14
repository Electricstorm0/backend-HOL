class DeleteCFFUseCase {
  constructor({ holEventsRepository }) {
    this._holEventsRepository = holEventsRepository;
  }

  async execute({ id }) {
    const events = await this._holEventsRepository.delete({ id });
    return events;
  }
}
module.exports = DeleteCFFUseCase;
