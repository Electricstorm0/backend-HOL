const GetPublications = require('../GetPublications');

describe('Get Publications entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      penulis: 'malik',
    };

    // Action & Assert
    expect(() => new GetPublications(payload)).toThrowError('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      penulis: 'malik',
      title: 123,
      program: 'clp',
      created_at: '2025-2-12',
      status: 'approved',
    };

    // Action & Assert
    expect(() => new GetPublications(payload)).toThrowError('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Get Publications entities correctly', () => {
    // Arrange
    const payload = {
      penulis: 'malik',
      title: 'rancang bangun website',
      program: 'clp',
      created_at: '2025-2-12',
      status: 'approved',
    };

    // Action
    const getDetailArticle = new GetPublications(payload);

    // Assert
    expect(getDetailArticle).toBeInstanceOf(GetPublications);
    expect(getDetailArticle.penulis).toEqual(payload.penulis);
    expect(getDetailArticle.title).toEqual(payload.title);
    expect(getDetailArticle.program).toEqual(payload.program);
    expect(getDetailArticle.tanggal_publish).toEqual(payload.created_at);
    expect(getDetailArticle.status).toEqual(payload.status);
  });
});
