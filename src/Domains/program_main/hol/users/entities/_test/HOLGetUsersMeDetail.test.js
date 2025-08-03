const HOLGetUsersMeDetail = require('../HOLGetUsersMeDetail');

describe('HOLGetUsersMeDetail entity', () => {
  it('should create HOLGetUsersMeDetail entity correctly', () => {
    // Arrange
    const payload = {
      id_users: 1,
      id_batch: 2,
      batch: 'Batch 5',
      batchYear: 2022,
      photoProfile: 'https://example.com/photo.jpg',
      id_card_number: '1234567890123456',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      phone_number: '081234567890',
      domicile: 'Jakarta',
      universities: 'Universitas Indonesia',
      institutions: 'BCF',
      secondTierProgramName: 'Leadership Program',
      musical_instrument: 'Guitar',
      ability: 'Public Speaking',
      description_ability: 'Excellent in delivering speech',
      bcf_activities: 'Mentoring, Training',
      other_activities: 'Volunteering',
      five_year_award: 'Best Alumnus',
      five_year_plan: 'Start NGO',
      five_year_plan_description: 'Create impact in society',
      id_card_selfie: 'https://example.com/selfie.jpg',
      regenciesUsersLocation: 'Jakarta Selatan',
    };

    // Act
    const detail = new HOLGetUsersMeDetail(payload);

    // Assert
    expect(detail).toBeInstanceOf(HOLGetUsersMeDetail);
    expect(detail.usersId).toBe(payload.id_users);
    expect(detail.batchId).toBe(payload.id_batch);
    expect(detail.batch).toBe(payload.batch);
    expect(detail.year).toBe(payload.batchYear);
    expect(detail.photoProfile).toBe(payload.photoProfile);
    expect(detail.numberCardId).toBe(payload.id_card_number);
    expect(detail.firstName).toBe(payload.first_name);
    expect(detail.lastName).toBe(payload.last_name);
    expect(detail.email).toBe(payload.email);
    expect(detail.numberPhone).toBe(payload.phone_number);
    expect(detail.domicile).toBe(payload.domicile);
    expect(detail.universities).toBe(payload.universities);
    expect(detail.institutions).toBe(payload.institutions);
    expect(detail.secondTierProgramName).toBe(payload.secondTierProgramName);
    expect(detail.musicalInstrument).toBe(payload.musical_instrument);
    expect(detail.ability).toBe(payload.ability);
    expect(detail.abilityDescription).toBe(payload.description_ability);
    expect(detail.activitiesBCF).toBe(payload.bcf_activities);
    expect(detail.activitiesOthers).toBe(payload.other_activities);
    expect(detail.fiveYearAward).toBe(payload.five_year_award);
    expect(detail.fiveYearPlan).toBe(payload.five_year_plan);
    expect(detail.fiveYearPlanDescription).toBe(payload.five_year_plan_description);
    expect(detail.cardSelfieId).toBe(payload.id_card_selfie);
    expect(detail.regenciesUsersLocation).toBe(payload.regenciesUsersLocation);
  });
});
