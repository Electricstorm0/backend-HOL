class CreateBAUseCase {
  constructor({ holEventsRepository, holEventsBARepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsBARepository = holEventsBARepository;
  }

  async execute(payload) {
    const { holEventsTypeId, pictureUrl, name, deadline, duration, regenciesId, description, benefit, contact_person, category } = payload;

    const eventId = await this._holEventsRepository.create({
      holEventsTypeId,
      pictureUrl,
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
      category,
    });
  }
}
module.exports = CreateBAUseCase;
