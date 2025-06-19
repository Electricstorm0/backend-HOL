class RegencieUseCase {
  constructor({ domicileRepository }) {
    this._domicileRepository = domicileRepository;
  }

  async addRegencie(payload) {
    const { provinceId, name } = payload;

    const regencieId = await this._domicileRepository.addRegencie({ provinceId, name });
    return regencieId;
  }

  async editRegencie(params, payload) {
    const { id: regencieId } = params;
    const { name } = payload;

    await this._domicileRepository.editRegencie({ name, regencieId });

    return name;
  }

  async deleteRegencie(params) {
    const { id: regencieId } = params;

    await this._domicileRepository.deleteRegencie(regencieId);

    return regencieId;
  }

  async getRegencies() {
    const pronvices = await this._domicileRepository.getRegencies();
    return pronvices;
  }

  async getRegencie(params) {
    const { id: regencieId } = params;

    const pronvice = await this._domicileRepository.getRegencie(regencieId);
    return pronvice;
  }
}

module.exports = RegencieUseCase;
