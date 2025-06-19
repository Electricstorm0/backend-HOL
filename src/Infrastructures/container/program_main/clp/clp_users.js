// USE CASE
const GetDomicilesUsersUseCase = require('../../../../Applications/use_case/Domicile/GetDomicilesUsersUseCase');
const GetProgramThirdTierByUsersAndBatch = require('../../../../Applications/use_case/Program/Program_Tier/GetProgramThirdTierByUsersAndBatch');
const CLPGetUsersByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersByDivisionInstitutionsUseCase');
const CLPGetUsersDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersDetailUseCase');
const CLPGetUsersMeDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersMeDetailUseCase');
const CLPGetUsersMeUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersMeUseCase');
const CLPGetUsersUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersUseCase');
const CLPUpdateUsersDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPUpdateUsersDetailUseCase');
const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
const GetUniversitiesUsersUseCase = require('../../../../Applications/use_case/Universities/GetUniversitiesUsersUseCase');
// REPOSITORY DOMAIN
const MasterBatchRepository = require('../../../../Domains/batch/MasterBatchRepository');
const MasterRegenciesRepository = require('../../../../Domains/domicile/regencies/MasterRegenciesRepository');
const MasterProgramRoleRepository = require('../../../../Domains/program/MasterProgramRoleRepository');
const OfferedProgramRepository = require('../../../../Domains/program/OfferedProgramRepository');
const CLPUsersRepository = require('../../../../Domains/program_main/clp/users/CLPUsersRepository');
const MasterUniversitiesRepository = require('../../../../Domains/universities/MasterUniversitiesRepository');
const UsersDetailRepository = require('../../../../Domains/users/UsersDetailRepository');
const UsersDomicileRepository = require('../../../../Domains/users/UsersDomicileRepository');
const UsersRepository = require('../../../../Domains/users/UsersRepository');
const UsersUniversitiesRepository = require('../../../../Domains/users/UsersUniversitiesRepository');

const users = [
  {
    key: CLPUpdateUsersDetailUseCase.name,
    Class: CLPUpdateUsersDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'clpUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'usersUniversitiesRepository',
          internal: UsersUniversitiesRepository.name,
        },
        {
          name: 'usersDomicileRepository',
          internal: UsersDomicileRepository.name,
        },
        {
          name: 'masterUniversitiesRepository',
          internal: MasterUniversitiesRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetUsersMeUseCase.name,
    Class: CLPGetUsersMeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'offeredProgramRepository',
          internal: OfferedProgramRepository.name,
        },
        {
          name: 'masterBatchRepository',
          internal: MasterBatchRepository.name,
        },
        {
          name: 'masterProgramRoleRepository',
          internal: MasterProgramRoleRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetUsersMeDetailUseCase.name,
    Class: CLPGetUsersMeDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'getProgramThirdTierByUsersAndBatch',
          internal: GetProgramThirdTierByUsersAndBatch.name,
        },
        {
          name: 'usersRepository',
          internal: UsersRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'clpUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'usersUniversitiesRepository',
          internal: UsersUniversitiesRepository.name,
        },
        {
          name: 'getUniversitiesUsersUseCase',
          internal: GetUniversitiesUsersUseCase.name,
        },
        {
          name: 'getDomicilesUsersUseCase',
          internal: GetDomicilesUsersUseCase.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
        {
          name: 'masterRegenciesRepository',
          internal: MasterRegenciesRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetUsersUseCase.name,
    Class: CLPGetUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'getProgramThirdTierByUsersAndBatch',
          internal: GetProgramThirdTierByUsersAndBatch.name,
        },
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'getUniversitiesUsersUseCase',
          internal: GetUniversitiesUsersUseCase.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetUsersDetailUseCase.name,
    Class: CLPGetUsersDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPGetUsersMeDetailUseCase',
          internal: CLPGetUsersMeDetailUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetUsersByDivisionInstitutionsUseCase.name,
    Class: CLPGetUsersByDivisionInstitutionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
      ],
    },
  },
];

module.exports = users;
