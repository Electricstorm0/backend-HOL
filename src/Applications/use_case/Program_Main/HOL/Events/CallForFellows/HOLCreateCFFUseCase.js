class CreateCFFUseCase {
  constructor({ holEventsRepository, holEventsCFFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsCFFRepository = holEventsCFFRepository;
  }

  async execute(payload) {
    const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, logoUrl, position, category, placements, registerUrl, requirements } = payload;

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
    await this._holEventsCFFRepository.create({
      holEventsId: eventId,
      logoUrl,
      position,
      category,
      placements,
      registerUrl,
      requirements,
    });
  }
}
module.exports = CreateCFFUseCase;
