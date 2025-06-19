const GetUniversitiesUseCase = require('../../Applications/use_case/Universities/GetUniversitiesUseCase');
const GetUniversitiesUsersUseCase = require('../../Applications/use_case/Universities/GetUniversitiesUsersUseCase');
// REPOSITORY
const MasterProvinciesRepository = require('../../Domains/domicile/provincies/MasterProvinciesRepository');
const MasterRegenciesRepository = require('../../Domains/domicile/regencies/MasterRegenciesRepository');
const MasterUniversitiesMajorRepository = require('../../Domains/universities/MasterUniversitiesMajorRepository');
const MasterUniversitiesRepository = require('../../Domains/universities/MasterUniversitiesRepository');
const UniversitiesMajorRepository = require('../../Domains/universities/UniversitiesMajorRepository');
const UsersUniversitiesRepository = require('../../Domains/users/UsersUniversitiesRepository');

const universities = [
  {
    key: GetUniversitiesUseCase.name,
    Class: GetUniversitiesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'universitiesRepository',
          internal: MasterUniversitiesRepository.name,
        },
        {
          name: 'masterProvinciesRepository',
          internal: MasterProvinciesRepository.name,
        },
      ],
    },
  },
  {
    key: GetUniversitiesUsersUseCase.name,
    Class: GetUniversitiesUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersUniversitiesRepository',
          internal: UsersUniversitiesRepository.name,
        },
        {
          name: 'masterUniversitiesRepository',
          internal: MasterUniversitiesRepository.name,
        },
        {
          name: 'masterUniversitiesMajorRepository',
          internal: MasterUniversitiesMajorRepository.name,
        },
        {
          name: 'universitiesMajorRepository',
          internal: UniversitiesMajorRepository.name,
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

module.exports = universities;
