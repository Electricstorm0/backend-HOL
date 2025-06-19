const GetProvinciesUseCase = require('../../../../../Applications/use_case/Domicile/Provincies/GetProvinciesUseCase');
const MasterProvinciesRepository = require('../../../../../Domains/domicile/provincies/MasterProvinciesRepository');

const container = [
  {
    key: GetProvinciesUseCase.name,
    Class: GetProvinciesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'masterProvinciesRepository',
          internal: MasterProvinciesRepository.name,
        },
      ],
    },
  },
];

module.exports = container;
