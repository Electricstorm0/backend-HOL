class HOLGetPublications {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, penulis, title, program, created_at, status } = payload;
    this.usersArticleId = id;
    this.penulis = penulis;
    this.program = program;
    this.title = title;
    this.tanggal_publish = created_at;
    this.status = status;
  }
  _verifyPayload({ title }) {
    if (!title) {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string') {
      throw new Error('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = HOLGetPublications;
