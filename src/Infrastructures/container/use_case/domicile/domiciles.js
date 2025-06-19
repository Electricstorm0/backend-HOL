const GetDomicilesUsersUseCase = require('../../../../Applications/use_case/Domicile/GetDomicilesUsersUseCase');
const MasterProvinciesRepository = require('../../../../Domains/domicile/provincies/MasterProvinciesRepository');
const MasterRegenciesRepository = require('../../../../Domains/domicile/regencies/MasterRegenciesRepository');
const UsersDomicileRepository = require('../../../../Domains/users/UsersDomicileRepository');

const domiciles = [
  {
    key: GetDomicilesUsersUseCase.name,
    Class: GetDomicilesUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersDomicileRepository',
          internal: UsersDomicileRepository.name,
        },
        {
          name: 'masterProvinciesRepository',
          internal: MasterProvinciesRepository.name,
        },
        {
          name: 'masterRegenciesRepository',
          internal: MasterRegenciesRepository.name,
        },
      ],
    },
  },
];

module.exports = domiciles;
