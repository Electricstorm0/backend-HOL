class CreateIYSFUseCase {
  constructor({ HOLEventsRepository, HOLEventsIYSFRepository }) {
    this._HOLEventsRepository = HOLEventsRepository;
    this._HOLEventsIYSFRepository = HOLEventsIYSFRepository;
  }

  async execute(payload) {
    try {
      const { holEventsTypeId, name, deadline, duration, regenciesId, description, benefit, contact_person, logoUrl, position, positionCategory, eventDate, requirements } = payload;

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
      await this._HOLEventsIYSFRepository.create({
        holEventsId: eventId,
        logoUrl,
        position,
        positionCategory,
        eventDate,
        requirements,
      });
      return eventId;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = CreateIYSFUseCase;
