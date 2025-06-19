const autoBind = require('auto-bind');
const ProvinceUseCase = require('../../../../../Applications/use_case/Domicile/Provincies/ProvinceUseCase');
const GetProvinciesUseCase = require('../../../../../Applications/use_case/Domicile/Provincies/GetProvinciesUseCase');

class ProvinciesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postProvinceHandler(request, h) {
    const useCase = this._container.getInstance(ProvinceUseCase.name);
    const provinceId = await useCase.addProvince(request.payload);

    return h.response({
      status: 'success',
      message: 'Sukses menambah provinsi!',
      provinceId,
    });
  }

  async putProvinceHandler(request, h) {
    const useCase = this._container.getInstance(ProvinceUseCase.name);
    const data = await useCase.editProvince(request.params, request.payload);

    return h.response({
      status: 'success',
      message: `Sukses mengubah nama provinsi ${data}!`,
    });
  }

  async deleteProvinceHandler(request, h) {
    const useCase = this._container.getInstance(ProvinceUseCase.name);
    await useCase.deleteProvince(request.params);

    return h.response({
      status: 'success',
      message: 'Sukses menghapus nama provinsi!',
    });
  }

  async getProvinciesHandler(request, h) {
    const useCase = this._container.getInstance(GetProvinciesUseCase.name);
    const data = await useCase.execute();

    return h.response({
      status: 'success',
      data,
    });
  }

  async getProvinceHandler(request, h) {
    const useCase = this._container.getInstance(ProvinceUseCase.name);
    const data = await useCase.getProvince(request.params);

    return h.response({
      status: 'success',
      data,
    });
  }
}

module.exports = ProvinciesHandler;
