class CreateCFFUseCase {
  constructor({ HOLEventsRepository, HOLEventsCFFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsCFFRepository = HOLEventsCFFRepository;
  }

  async execute(payload) {
    try {
      const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, logoUrl, position, category, placements, registerUrl, requirements } = payload;

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
      await this._HOLEventsCFFRepository.create({
        holEventsId: eventId,
        logoUrl,
        position,
        category,
        placements,
        registerUrl,
        requirements,
      });
      return eventId;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CreateCFFUseCase;
