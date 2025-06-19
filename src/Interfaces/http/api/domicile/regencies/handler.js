const autoBind = require('auto-bind');
const RegencieUseCase = require('../../../../../Applications/use_case/Domicile/Regencies/RegencieUseCase');
const GetProvinciesByRegenciesUseCase = require('../../../../../Applications/use_case/Domicile/Provincies/GetProvinciesByRegenciesUseCase');

class RegenciesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postRegencieHandler(request, h) {
    const regencieUseCase = this._container.getInstance(RegencieUseCase.name);
    const provinceId = await regencieUseCase.addRegencie(request.payload);

    return h.response({
      status: 'success',
      message: 'Sukses menambah provinsi!',
      provinceId,
    });
  }

  async putRegencieHandler(request, h) {
    const regencieUseCase = this._container.getInstance(RegencieUseCase.name);
    const data = await regencieUseCase.editRegencie(request.params, request.payload);

    return h.response({
      status: 'success',
      message: `Sukses mengubah nama kota ${data}!`,
    });
  }

  async deleteRegencieHandler(request, h) {
    const regencieUseCase = this._container.getInstance(RegencieUseCase.name);
    await regencieUseCase.deleteRegencie(request.params);

    return h.response({
      status: 'success',
      message: 'Sukses menghapus nama kab/kota!',
    });
  }

  async getRegenciesHandler(request, h) {
    const regencieUseCase = this._container.getInstance(RegencieUseCase.name);
    const data = await regencieUseCase.getRegencies();

    return h.response({
      status: 'success',
      data,
    });
  }

  async getRegencieHandler(request, h) {
    const regencieUseCase = this._container.getInstance(RegencieUseCase.name);
    const data = await regencieUseCase.getRegencie(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }

  async getRegenciesByPronviciesHandler(request, h) {
    const useCase = this._container.getInstance(GetProvinciesByRegenciesUseCase.name);
    const data = await useCase.execute(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = RegenciesHandler;
