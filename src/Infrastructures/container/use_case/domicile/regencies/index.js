const GetProvinciesByRegenciesUseCase = require('../../../../../Applications/use_case/Domicile/Provincies/GetProvinciesByRegenciesUseCase');
const MasterRegenciesRepository = require('../../../../../Domains/domicile/regencies/MasterRegenciesRepository');

const container = [
  {
    key: GetProvinciesByRegenciesUseCase.name,
    Class: GetProvinciesByRegenciesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'masterRegenciesRepository',
          internal: MasterRegenciesRepository.name,
        },
      ],
    },
  },
];

module.exports = container;
