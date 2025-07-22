class HOLUpdateUniversities {
  constructor(payload) {
    const { universitiesName, universitiesType, universitiesProvincesId, universitiesRegenciesId } = payload;

    this.name = universitiesName;
    this.type = universitiesType;
    this.id_province = universitiesProvincesId === '' ? null : universitiesProvincesId;
    this.id_regencie = universitiesRegenciesId === '' ? null : universitiesRegenciesId;
  }
}
module.exports = HOLUpdateUniversities;
