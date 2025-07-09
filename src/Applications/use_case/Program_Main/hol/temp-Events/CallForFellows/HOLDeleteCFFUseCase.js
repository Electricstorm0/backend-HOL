class DeleteCFFUseCase {
  constructor({ HOLEventsRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
  }

  async execute({ id }) {
    const events = await this._HOLEventsRepository.delete({ id });
    return events;
  }
}
module.exports = DeleteCFFUseCase;
