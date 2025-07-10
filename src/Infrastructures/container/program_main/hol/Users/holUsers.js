const pool = require('../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersRepository = require('../../../../../Domains/program_main/hol/temp-Users/HOLUsersRepository');
const HOLUsersRepositoryMySQL = require('../../../../repository/program_main/hol/Users/HOLUsersRepositoryMySQL');
const MasterBatchRepository = require('../../../../../Domains/batch/MasterBatchRepository');
const MasterProgramRoleRepository = require('../../../../../Domains/program/MasterProgramRoleRepository');
const OfferedProgramRepository = require('../../../../../Domains/program/OfferedProgramRepository');
// const MasterUniversitiesRepository = require('../../../../../Domains/universities/MasterUniversitiesRepository');
const UsersDetailRepository = require('../../../../../Domains/users/UsersDetailRepository');
const CLPGetUsersMeDetailUseCase = require('../../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersMeDetailUseCase');

// const MasterRegenciesRepository = require('../../../../../Domains/domicile/regencies/MasterRegenciesRepository');

// const UsersDomicileRepository = require('../../../../../Domains/users/UsersDomicileRepository');
// const UsersRepository = require('../../../../../Domains/users/UsersRepository');
// const UsersUniversitiesRepository = require('../../../../../Domains/users/UsersUniversitiesRepository');

// const GetDomicilesUsersUseCase = require('../../../../../Applications/use_case/Domicile/GetDomicilesUsersUseCase');
// const GetProgramThirdTierByUsersAndBatch = require('../../../../../Applications/use_case/Program/Program_Tier/GetProgramThirdTierByUsersAndBatch');
// const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
// const GetUniversitiesUsersUseCase = require('../../../../../Applications/use_case/Universities/GetUniversitiesUsersUseCase');

const HOLCreateUsersUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLCreateUsersUseCase');
const HOLGetUsersUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersUseCase');
const HOLGetUsersByIdUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersByIdUseCase');
const HOLGetUsersMeUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersMeUseCase');
const HOLGetUsersMeDetailUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetUsersMeDetailUseCase');
const HOLUpdateUsersUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLUpdateUsersUseCase');
const HOLDeleteUsersUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLDeleteUsersUseCase');
const HOLGetTotalUsersUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetTotalUsersUseCase');
const HOLGetTotalUsersByProgramUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Users/HOLGetTotalUsersByProgramUseCase');
const usersHol = [
  // REPOSITORY
  {
    key: HOLUsersRepository.name,
    Class: HOLUsersRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLUsersRepository.name,
    Class: HOLUsersRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },

  // USE CASE
  {
    key: HOLCreateUsersUseCase.name,
    Class: HOLCreateUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersUseCase.name,
    Class: HOLGetTotalUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersByProgramUseCase.name,
    Class: HOLGetTotalUsersByProgramUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersUseCase.name,
    Class: HOLGetUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersByIdUseCase.name,
    Class: HOLGetUsersByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersMeUseCase.name,
    Class: HOLGetUsersMeUseCase,
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
    key: HOLGetUsersMeDetailUseCase.name,
    Class: HOLGetUsersMeDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
        {
          name: 'CLPGetUsersMeDetailUseCase',
          internal: CLPGetUsersMeDetailUseCase.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateUsersUseCase.name,
    Class: HOLUpdateUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteUsersUseCase.name,
    Class: HOLDeleteUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersRepository',
          internal: HOLUsersRepository.name,
        },
      ],
    },
  },
];

module.exports = usersHol;
