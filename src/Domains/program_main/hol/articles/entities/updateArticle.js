class HOLUpdateArticle {
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, abstract, fileUrl, citation, linkCitation } = payload;
    this.title = title;
    this.abstract = abstract;
    this.url_file = fileUrl;
    this.citation = citation;
    this.link_citation = linkCitation;
  }
  _verifyPayload({ title, abstract, fileUrl, citation, linkCitation }) {
    if (!title || !abstract || !fileUrl || !citation || !linkCitation) {
      throw new Error('UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string' || typeof abstract !== 'string' || typeof fileUrl !== 'string' || typeof citation !== 'string' || typeof linkCitation !== 'string') {
      throw new Error('UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = HOLUpdateArticle;
