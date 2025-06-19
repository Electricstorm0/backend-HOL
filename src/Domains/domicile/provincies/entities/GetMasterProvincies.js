/* eslint-disable camelcase */
class GetMasterProvincies {
  constructor(payload) {
    const { id, name } = payload;

    this.provinceId = id;
    this.provinceName = name;
  }
}

module.exports = GetMasterProvincies;
