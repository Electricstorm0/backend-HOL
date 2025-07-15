class CreateBAUseCase {
  constructor({ holEventsRepository, holEventsBARepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsBARepository = holEventsBARepository;
  }

  async execute(payload) {
    const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, pictureUrl, category } = payload;

    const eventId = await this._holEventsRepository.create({
      holEventsTypeId,
      name,
      deadline,
      duration,
      regenciesId,
      description,
      benefit,
      contact_person,
    });
    await this._holEventsBARepository.create({
      holEventsId: eventId,
      pictureUrl,
      category,
    });
  }
}
module.exports = CreateBAUseCase;
