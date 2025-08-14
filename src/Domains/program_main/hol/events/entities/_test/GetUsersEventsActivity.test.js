// __tests__/GetUsersEventActivity.test.js
const GetUsersEventActivity = require('../GetUsersEventActivity');

describe('GetUsersEventActivity entities', () => {
  it('should create GetUsersEventActivity object correctly when payload is valid', () => {
    const payload = {
      name: 'Tech Conference',
      deadline: new Date('2025-08-12'),
      duration: '2 days',
      domicile: 'Jakarta',
      picture_url: 'http://example.com/image.jpg',
      category: 'Technology',
      position: 'Speaker',
      event_date: '2025-08-15',
      status: 'Active',
    };

    const event = new GetUsersEventActivity(payload);

    expect(event.name).toBe(payload.name);
    expect(event.deadline).toEqual(payload.deadline);
    expect(event.duration).toBe(payload.duration);
    expect(event.domicile).toBe(payload.domicile);
    expect(event.pictureUrl).toBe(payload.picture_url);
    expect(event.category).toBe(payload.category);
    expect(event.position).toBe(payload.position);
    expect(event.eventDate).toBe(payload.event_date);
    expect(event.status).toBe(payload.status);
  });

  it('should throw error when required property is missing', () => {
    const payload = {
      name: 'Tech Conference',
      // deadline missing
      duration: '2 days',
      domicile: 'Jakarta',
      picture_url: 'http://example.com/image.jpg',
    };

    expect(() => new GetUsersEventActivity(payload)).toThrowError('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when property data type does not match specification', () => {
    const payload = {
      name: 'Tech Conference',
      deadline: '2025-08-12', // ❌ should be Date object
      duration: '2 days',
      domicile: 'Jakarta',
      picture_url: 12345, // ❌ should be string
    };

    expect(() => new GetUsersEventActivity(payload)).toThrowError('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
