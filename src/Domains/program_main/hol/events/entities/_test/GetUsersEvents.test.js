const GetUsersEvents = require('../GetUsersEvents');

describe('Get Users Events entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      usersHolId: 2,
    };

    // Action & Assert
    expect(() => new GetUsersEvents(payload)).toThrowError('GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id_users_hol: 2,
      id_events_hol: '21',
      Alumni_Name: 'muzak',
      Program: 'clp',
      batch: 2,
      Year: 2023,
      domicile: 'jakarta selatan',
      attendance: 1,
      status: 1,
    };

    // Action & Assert
    expect(() => new GetUsersEvents(payload)).toThrowError('GET_USERS_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Get Users Events entities correctly', () => {
    // Arrange
    const payload = {
      id_users_hol: 2,
      id_events_hol: 21,
      Alumni_Name: 'muzak',
      Program: 'clp',
      batch: 2,
      Year: 2023,
      domicile: 'jakarta selatan',
      attendance: 1,
      status: 1,
    };

    // Action
    const getUsersEvents = new GetUsersEvents(payload);

    // Assert
    expect(getUsersEvents).toBeInstanceOf(GetUsersEvents);
    expect(getUsersEvents.usersHolId).toEqual(payload.id_users_hol);
    expect(getUsersEvents.eventsHolId).toEqual(payload.id_events_hol);
    expect(getUsersEvents.alumniName).toEqual(payload.Alumni_Name);
    expect(getUsersEvents.program).toEqual(payload.Program);
    expect(getUsersEvents.batch).toEqual(payload.batch);
    expect(getUsersEvents.year).toEqual(payload.Year);
    expect(getUsersEvents.domicile).toEqual(payload.domicile);
    expect(getUsersEvents.attendance).toEqual(payload.attendance);
    expect(getUsersEvents.status).toEqual(payload.status);
  });
});
