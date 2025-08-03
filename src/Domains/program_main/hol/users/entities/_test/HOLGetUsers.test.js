const HolGetUsers = require('../HolGetUsers');

describe('HolGetUsers entities', () => {
  it('should create HolGetUsers entity correctly', () => {
    // Arrange
    const payload = {
      id: 1,
      id_users: 2,
      id_batch: 3,
      photoProfile: 'http://example.com/photo.jpg',
      Alumni_Name: 'Jane Doe',
      program: 'Computer Science',
      batch: '2023',
      domisili: 'Jakarta',
      recent_journey: 'Internship at Google',
      musical_instrument: 'Guitar',
      talent: 'Singing',
      talent_description_selected: 'Pop songs',
      bcf_activites: 'Leadership camp',
      other_activites: 'Volunteering',
      five_year_award: 'Top Student',
      five_year_plan: 'Become tech lead',
      five_year_plan_description: 'Leading a team at a tech startup',
      ability: 'Public Speaking',
      ability_description_selected: 'Motivational talks',
      ability_award_selected: 'Best Speaker Award',
      achievement_last_three_years: 'Won hackathon',
      activities_outside_college_and_internship: 'NGO activities',
      have_a_business: 'Yes',
      joined_social_communities: 'Youth Forum',
    };

    // Action
    const user = new HolGetUsers(payload);

    // Assert
    expect(user).toBeInstanceOf(HolGetUsers);
    expect(user.usersHOLId).toEqual(payload.id);
    expect(user.usersId).toEqual(payload.id_users);
    expect(user.batchId).toEqual(payload.id_batch);
    expect(user.photoProfile).toEqual(payload.photoProfile);
    expect(user.alumniName).toEqual(payload.Alumni_Name);
    expect(user.program).toEqual(payload.program);
    expect(user.batch).toEqual(payload.batch);
    expect(user.domicile).toEqual(payload.domisili);
    expect(user.recent_journey).toEqual(payload.recent_journey);
    expect(user.musicalInstrument).toEqual(payload.musical_instrument);
    expect(user.talent).toEqual(payload.talent);
    expect(user.taletDescriptionSelected).toEqual(payload.talent_description_selected);
    expect(user.bcfActivities).toEqual(payload.bcf_activites);
    expect(user.otherActivities).toEqual(payload.other_activites);
    expect(user.fiveYearAward).toEqual(payload.five_year_award);
    expect(user.fiveYearPlan).toEqual(payload.five_year_plan);
    expect(user.fiveYearPlanDescription).toEqual(payload.five_year_plan_description);
    expect(user.ability).toEqual(payload.ability);
    expect(user.abilityDescriptionSelected).toEqual(payload.ability_description_selected);
    expect(user.abilityAwardSelected).toEqual(payload.ability_award_selected);
    expect(user.achievementsLastThreeYears).toEqual(payload.achievement_last_three_years);
    expect(user.activitiesOutside).toEqual(payload.activities_outside_college_and_internship);
    expect(user.haveABussiness).toEqual(payload.have_a_business);
    expect(user.joinedSocialCommunities).toEqual(payload.joined_social_communities);
  });
});
