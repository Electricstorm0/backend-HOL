class HOLGetPublications {
  constructor(payload) {
    this._verifyPayload(payload);
    const { penulis, title, created_at } = payload;
    this.penulis = penulis;
    this.title = title;
    this.tanggal_publish = created_at;
  }
  _verifyPayload({ title, created_at }) {
    if (!title || !created_at) {
      throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string') {
      throw new Error('GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = HOLGetPublications;
