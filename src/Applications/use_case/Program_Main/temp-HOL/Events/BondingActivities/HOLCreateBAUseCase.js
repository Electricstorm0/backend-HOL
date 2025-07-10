class CreateBAUseCase {
  constructor({ HOLEventsRepository, HOLEventsBARepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsBARepository = HOLEventsBARepository;
  }

  async execute(payload) {
    const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, pictureUrl, category } = payload;

    const eventId = await this._HOLEventsRepository.create({
      holEventsTypeId,
      name,
      deadline,
      duration,
      regenciesId,
      description,
      benefit,
      contact_person,
    });
    await this._HOLEventsBARepository.create({
      holEventsId: eventId,
      pictureUrl,
      category,
    });
    return eventId;
  }
}
module.exports = CreateBAUseCase;
