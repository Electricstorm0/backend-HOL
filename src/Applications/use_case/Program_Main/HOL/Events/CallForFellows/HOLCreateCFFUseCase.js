class CreateCFFUseCase {
  constructor({ holEventsRepository, holEventsCFFRepository }) {
    this._holEventsRepository = holEventsRepository;
    this._holEventsCFFRepository = holEventsCFFRepository;
  }

  async execute(payload) {
    const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, pictureUrl, position, category, placements, registerUrl, requirements } = payload;

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
    await this._holEventsCFFRepository.create({
      holEventsId: eventId,
      position,
      category,
      placements,
      registerUrl,
      requirements,
    });
  }
}
module.exports = CreateCFFUseCase;
