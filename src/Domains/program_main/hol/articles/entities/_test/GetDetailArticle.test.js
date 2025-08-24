const GetDetailArticle = require('../GetDetailArticle');

describe('Get Detail Article entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'Rancang bangun website',
    };

    // Action & Assert
    expect(() => new GetDetailArticle(payload)).toThrowError('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      abstract: 'article ini membahas mengenai rancang bangu website',
      url_file: 'http://article.com/file.pdf',
      citation: 'sujono2023',
      link_citation: 'http://googlebooks.com',
      updated_at: '2025-2-12',
    };

    // Action & Assert
    expect(() => new GetDetailArticle(payload)).toThrowError('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Get Detail Article entities correctly', () => {
    // Arrange
    const payload = {
      title: 'Rancang bangun website',
      abstract: 'article ini membahas mengenai rancang bangu website',
      url_file: 'http://article.com/file.pdf',
      citation: 'sujono2023',
      link_citation: 'http://googlebooks.com',
      updated_at: '2025-2-12',
    };

    // Action
    const getDetailArticle = new GetDetailArticle(payload);

    // Assert
    expect(getDetailArticle).toBeInstanceOf(GetDetailArticle);
    expect(getDetailArticle.title).toEqual(payload.title);
    expect(getDetailArticle.abstract).toEqual(payload.abstract);
    expect(getDetailArticle.fileUrl).toEqual(payload.url_file);
    expect(getDetailArticle.citation).toEqual(payload.citation);
    expect(getDetailArticle.linkCitation).toEqual(payload.link_citation);
    expect(getDetailArticle.tanggal_publish).toEqual(payload.updated_at);
  });
});
