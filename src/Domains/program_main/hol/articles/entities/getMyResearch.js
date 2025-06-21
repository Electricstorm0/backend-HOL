class HOLGetMyResearch {
  constructor(payload) {
    this._verifyPayload(payload);
    const { title, abstract, url_file, citation, link_citation, created_at, status } = payload;
    this.title = title;
    this.abstract = abstract;
    this.fileUrl = url_file;
    this.citation = citation;
    this.linkCitation = link_citation;
    this.tanggal_publish = created_at;
    this.status = status;
  }
  _verifyPayload({ title, abstract, url_file, citation, link_citation, created_at }) {
    if (!title || !abstract || !url_file || !citation || !link_citation || !created_at) {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string' || typeof abstract !== 'string' || typeof url_file !== 'string' || typeof citation !== 'string' || typeof link_citation !== 'string') {
      throw new Error('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = HOLGetMyResearch;
