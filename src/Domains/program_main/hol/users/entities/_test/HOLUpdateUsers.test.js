const HolUpdateUsers = require('../HOLUpdateUsers');

describe('HolUpdateUsers entity', () => {
  it('should create HolUpdateUsers entity correctly when given valid payload', () => {
    // Arrange
    const payload = {
      usersHOLId: 1,
      musicalInstrument: 'Guitar',
      talent: 'Singing',
      taletDescriptionSelected: 'Pop singer',
      bcfActivities: 'Mentoring',
      otherActivities: 'Volunteering',
      fiveYearAward: 'Best Talent',
      fiveYearPlan: 'Become mentor',
      fiveYearPlanDescription: 'Support young talents',
      ability: 'Public Speaking',
      abilityDescriptionSelected: 'Great at presentations',
      abilityAwardSelected: 'Top Speaker',
      achievementsLastThreeYears: 'Won debate competition',
      activitiesOutside: 'Internship at NGO',
      haveABussiness: 'Yes',
      joinedSocialCommunities: 'Youth Changemakers',
    };

    // Act
    const userUpdate = new HolUpdateUsers(payload);

    // Assert
    expect(userUpdate.id).toBe(payload.usersHOLId);
    expect(userUpdate.musical_instrument).toBe(payload.musicalInstrument);
    expect(userUpdate.talent).toBe(payload.talent);
    expect(userUpdate.talent_description_selected).toBe(payload.taletDescriptionSelected);
    expect(userUpdate.bcf_activites).toBe(payload.bcfActivities);
    expect(userUpdate.other_activites).toBe(payload.otherActivities);
    expect(userUpdate.five_year_award).toBe(payload.fiveYearAward);
    expect(userUpdate.five_year_plan).toBe(payload.fiveYearPlan);
    expect(userUpdate.five_year_plan_description).toBe(payload.fiveYearPlanDescription);
    expect(userUpdate.ability).toBe(payload.ability);
    expect(userUpdate.ability_description_selected).toBe(payload.abilityDescriptionSelected);
    expect(userUpdate.ability_award_selected).toBe(payload.abilityAwardSelected);
    expect(userUpdate.achievement_last_three_years).toBe(payload.achievementsLastThreeYears);
    expect(userUpdate.activities_outside_college_and_internship).toBe(payload.activitiesOutside);
    expect(userUpdate.have_a_business).toBe(payload.haveABussiness);
    expect(userUpdate.joined_social_communities).toBe(payload.joinedSocialCommunities);
  });

  it('should throw error when required properties are missing', () => {
    // Arrange
    const invalidPayload = {
      usersHOLId: 1,
      musicalInstrument: '',
      talent: 'Dancing',
      taletDescriptionSelected: 'Hip-hop',
      bcfActivities: '',
      otherActivities: 'Teaching',
      fiveYearAward: '',
      fiveYearPlan: 'Open a studio',
      fiveYearPlanDescription: '',
      ability: 'Leadership',
      abilityDescriptionSelected: 'Good at managing teams',
      abilityAwardSelected: 'Leader Award',
      achievementsLastThreeYears: '',
      activitiesOutside: '',
      haveABussiness: '',
      joinedSocialCommunities: '',
    };

    // Act & Assert
    expect(() => new HolUpdateUsers(invalidPayload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
