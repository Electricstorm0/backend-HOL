class ProvinceUseCase {
  constructor({ domicileRepository }) {
    this._domicileRepository = domicileRepository;
  }

  async addProvince(payload) {
    const { name } = payload;

    const provinceId = await this._domicileRepository.addProvince(name);
    return provinceId;
  }

  async editProvince(params, payload) {
    const { id: provinceId } = params;
    const { name } = payload;

    await this._domicileRepository.editPronvice({ name, provinceId });

    return name;
  }

  async deleteProvince(params) {
    const { id: provinceId } = params;

    await this._domicileRepository.deletePronvice(provinceId);

    return provinceId;
  }

  async getProvinces() {
    const pronvices = await this._domicileRepository.getPronvices();
    return pronvices;
  }

  async getProvince(params) {
    const { id: provinceId } = params;

    const pronvice = await this._domicileRepository.getProvince(provinceId);
    return pronvice;
  }
}

module.exports = ProvinceUseCase;
