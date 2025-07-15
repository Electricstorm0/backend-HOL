class CreateIYSFUseCase {
  constructor({ holEventsRepository, holEventsIYSFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsIYSFRepository = holEventsIYSFRepository;
  }

  async execute(payload) {
    const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, logoUrl, position, positionCategory, eventDate, requirements } = payload;

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
    await this._holEventsIYSFRepository.create({
      holEventsId: eventId,
      logoUrl,
      position,
      positionCategory,
      eventDate,
      requirements,
    });
  }
}
module.exports = CreateIYSFUseCase;
