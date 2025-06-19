/* eslint-disable camelcase */
class GetMasterBatch {
  constructor(payload) {
    const {
      id, batch, date_start, date_end,
    } = payload;

    this.batchId = id;
    this.batch = batch;
    this.startDate = date_start;
    this.endDate = date_end;
  }
}

module.exports = GetMasterBatch;
