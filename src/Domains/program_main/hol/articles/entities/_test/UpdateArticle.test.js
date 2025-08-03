const UpdateArticle = require('../UpdateArticle');

describe('Update Article entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'Rancang bangun website',
    };

    // Action & Assert
    expect(() => new UpdateArticle(payload)).toThrowError('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      abstract: 'article ini membahas mengenai rancang bangu website',
      fileUrl: 'http://article.com/file.pdf',
      citation: 'sujono,2023',
      linkCitation: 'http://googlebooks.com',
      created_at: '2025-2-12',
    };

    // Action & Assert
    expect(() => new UpdateArticle(payload)).toThrowError('UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should Update Article entities correctly', () => {
    // Arrange
    const payload = {
      title: 'Rancang bangun website',
      abstract: 'article ini membahas mengenai rancang bangu website',
      fileUrl: 'http://article.com/file.pdf',
      citation: 'sujono,2023',
      linkCitation: 'http://googlebooks.com',
      created_at: '2025-2-12',
    };

    // Action
    const updateArticle = new UpdateArticle(payload);

    // Assert
    expect(updateArticle).toBeInstanceOf(UpdateArticle);
    expect(updateArticle.title).toEqual(payload.title);
    expect(updateArticle.abstract).toEqual(payload.abstract);
    expect(updateArticle.url_file).toEqual(payload.fileUrl);
    expect(updateArticle.citation).toEqual(payload.citation);
    expect(updateArticle.link_citation).toEqual(payload.linkCitation);
    expect(updateArticle.created_at).toEqual(payload.tanggal_publish);
  });
});
