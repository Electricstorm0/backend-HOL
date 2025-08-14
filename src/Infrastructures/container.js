/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/mysql/pool');

// service (repository, helper, manager, etc)
const UsersRepository = require('../Domains/users/UsersRepository');
const UsersDetailRepository = require('../Domains/users/UsersDetailRepository');
const UsersUniversitiesRepository = require('../Domains/users/UsersUniversitiesRepository');
const UsersDomicileRepository = require('../Domains/users/UsersDomicileRepository');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const MasterBatchRepository = require('../Domains/batch/MasterBatchRepository');
const OfferedProgramRepository = require('../Domains/program/OfferedProgramRepository');
const MasterProgramRoleRepository = require('../Domains/program/MasterProgramRoleRepository');

// repository
const UsersRepositoryMySQL = require('./repository/users/UsersRepositoryMySQL');
const UsersDetailRepositoryMySQL = require('./repository/users/UsersDetailRepositoryMySQL');
const UsersUniversitiesRepositoryMySQL = require('./repository/users/UsersUniversitiesRepositoryMySQL');
const UsersDomicileRepositoryMySQL = require('./repository/users/UsersDomicileRepositoryMySQL');
const AuthenticationRepositoryMySQL = require('./repository/authentications/AuthenticationRepositoryMySQL');
const MasterBatchRepositoryMySQL = require('./repository/batch/MasterBatchRepositoryMySQL');
const OfferedProgramRepositoryMySQL = require('./repository/program/OfferedProgramRepositoryMySQL');
const MasterProgramRoleRepositoryMySQL = require('./repository/program/MasterProgramRoleRepositoryMySQL');
const MasterProgramThirdTierRepository = require('../Domains/program/program_tier/MasterProgramThirdTierRepository');

const MasterUniversitiesRepository = require('../Domains/universities/MasterUniversitiesRepository');
const MasterUniversitiesRepositoryMySQL = require('./repository/universities/MasterUniversitiesRepositoryMySQL');
const MasterUniversitiesMajorRepository = require('../Domains/universities/MasterUniversitiesMajorRepository');
const MasterUniversitiesMajorRepositoryMySQL = require('./repository/universities/MasterUniversitiesMajorRepositoryMySQL');
const UniversitiesMajorRepository = require('../Domains/universities/UniversitiesMajorRepository');
const UniversitiesMajorRepositoryMySQL = require('./repository/universities/UniversitiesMajorRepositoryMySQL');
const MasterProgramThirdTierRepositoryMySQL = require('./repository/program/program_tier/MasterProgramThirdTierRepositoryMySQL');

// helper
const PasswordHash = require('../Applications/security/PasswordHash');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const JwtTokenManager = require('./security/JwtTokenManager');

// container
const universities = require('./container/universities');
const users = require('./container/users');
const authentication = require('./container/authentications');
const master_domiciles = require('./container/master/domicile');
const domiciles = require('./container/use_case/domicile/domiciles');
const domicile_provicies = require('./container/use_case/domicile/provincies');
const domicile_regencies = require('./container/use_case/domicile/regencies');
const program = require('./container/program');

// BCF
const employeeBCF = require('./container/bcf/employee/container_employee_repository');
const userBCF = require('./container/bcf/users/container_users_repository');

// USE CASE program container

// LEAD
const LEADUsers = require('./container/program_main/lead/lead_users');
const LEADInstitutions = require('./container/program_main/lead/lead_institutions');
// HOL
// events
const HOLCFFRepository = require('./container/program_main/hol/events/events_detail/call_for_fellows/hol_call_for_fellows_repository');
const HOLCFFUseCase = require('./container/program_main/hol/events/events_detail/call_for_fellows/hol_call_for_fellows_use_case.js');
const HOLBARepository = require('./container/program_main/hol/events/events_detail/bonding_activities/hol_bonding_activities_repository');
const HOLBAUseCase = require('./container/program_main/hol/events/events_detail/bonding_activities/hol_bonding_activities_use_case');
const HOLIYSFRepository = require('./container/program_main/hol/events/events_detail/iysf/hol_iysf_repository');
const HOLIYSFUseCase = require('./container/program_main/hol/events/events_detail/iysf/hol_iysf_use_case');
const HOLUsersEventsRepository = require('./container/program_main/hol/events/users/hol_events_users_repository');
const HOLUsersEventsUseCase = require('./container/program_main/hol/events/users/hol_events_users_use_case');
// users
const HOLUsersRepository = require('./container/program_main/hol/users/hol_users_repository');
const HOLUsersUseCase = require('./container/program_main/hol/users/hol_users_use_case');
// users journey
const HOLUsersAchieveRepository = require('./container/program_main/hol/users/journey/achievements/hol_users_achievements_repository');
const HOLUsersAchieveUseCase = require('./container/program_main/hol/users/journey/achievements/hol_users_achievements_use_case');
const HOLUsersExpRepository = require('./container/program_main/hol/users/journey/work_experience/hol_users_work_experience_repository');
const HOLUsersExpUseCase = require('./container/program_main/hol/users/journey/work_experience/hol_users_work_experience_use_case');
const HOLUsersInvolveRepository = require('./container/program_main/hol/users/journey/involvements/hol_users_involvements_repository');
const HOLUsersInvolveUseCase = require('./container/program_main/hol/users/journey/involvements/hol_users_involvements_use_case');
// Recommendations
const HOLRecommendationsUseCase = require('./container/program_main/hol/recommendations/hol_recommendations_use_case');
const HOLRecommendationsRepository = require('./container/program_main/hol/recommendations/hol_recommendations_repository');
// Article
const HOLArticleUseCase = require('./container/program_main/hol/articles/hol_articles_use_case');
const HOLArticleRepository = require('./container/program_main/hol/articles/hol_articles_repository');

// DOMAIN REPOSITORY CLP
// const CLPUsersRepository = require('../Domains/program_main/clp/users/CLPUsersRepository');
// const CLPUsersRepositoryMySQL = require('./repository/program_main/clp/users/CLPUsersRepositoryMySQL');

// DOMAIN & REPOSITORY LEAD
const LEADInstitutionsRepository = require('../Domains/program_main/lead/institutions/LEADInstitutionsRepository');
const LEADInstitutionsRepositoryMySQL = require('./repository/program_main/lead/institutions/LEADInstitutionsRepositoryMySQL');
const LEADMasterInstitutionsType = require('../Domains/program_main/lead/institutions/LEADMasterInstitutionsType');
const LEADMasterInstitutionsTypeMySQL = require('./repository/program_main/lead/institutions/LEADMasterInstitutionsTypeMySQL');
const LEADInstitutionsClusterRepository = require('../Domains/program_main/lead/institutions/cluster/LEADInstitutionsClusterRepository');
const LEADInstitutionsClusterRepositoryMySQL = require('./repository/program_main/lead/institutions/clusters/LEADInstitutionsClusterRepositoryMySQL');
const LEADMasterInstitutionsClusterFocusRepository = require('../Domains/program_main/lead/institutions/cluster/LEADMasterInstitutionsClusterFocusRepository');
const LEADMasterInstitutionsClusterFocusRepositoryMySQL = require('./repository/program_main/lead/institutions/clusters/LEADMasterInstitutionsClusterFocusRepositoryMySQL');
const LEADMasterInstitutionsClusterTypeRepository = require('../Domains/program_main/lead/institutions/cluster/LEADMasterInstitutionsClusterTypeRepository');
const LEADMasterInstitutionsClusterTypeRepositoryMySQL = require('./repository/program_main/lead/institutions/clusters/LEADMasterInstitutionsClusterTypeRepositoryMySQL');
const LEADMasterDivisionRepository = require('../Domains/program_main/lead/division/LEADMasterDivisionRepository');
const LEADMasterDivisionRepositoryMySQL = require('./repository/program_main/lead/division/LEADMasterDivisionRepositoryMySQL');
const LEADDivisionInstitutionsRepository = require('../Domains/program_main/lead/division/LEADDivisionInstitutionsRepository');
const LEADDivisionInstitutionsRepositoryMySQL = require('./repository/program_main/lead/division/LEADDivisionInstitutionsRepositoryMySQL');

// creating container
const container = createContainer();

// registering services and repository

// SERVICES
container.register([
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// MASTER REPOSITORY
container.register([
  {
    key: MasterProgramThirdTierRepository.name,
    Class: MasterProgramThirdTierRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: MasterBatchRepository.name,
    Class: MasterBatchRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: MasterProgramRoleRepository.name,
    Class: MasterProgramRoleRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// MASTER UNIVERSITIES
container.register([
  {
    key: MasterUniversitiesRepository.name,
    Class: MasterUniversitiesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UniversitiesMajorRepository.name,
    Class: UniversitiesMajorRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: MasterUniversitiesMajorRepository.name,
    Class: MasterUniversitiesMajorRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// TRANSACTION REPOSITORY
container.register([
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UsersRepository.name,
    Class: UsersRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UsersDetailRepository.name,
    Class: UsersDetailRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UsersUniversitiesRepository.name,
    Class: UsersUniversitiesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UsersDomicileRepository.name,
    Class: UsersDomicileRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: OfferedProgramRepository.name,
    Class: OfferedProgramRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// CLP REPOSITORY
// container.register([
//   {
//     key: CLPUsersRepository.name,
//     Class: CLPUsersRepositoryMySQL,
//     parameter: {
//       dependencies: [
//         {
//           concrete: pool,
//         },
//       ],
//     },
//   },
// ]);

// LEAD REPOSITORY
container.register([
  {
    key: LEADInstitutionsRepository.name,
    Class: LEADInstitutionsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADMasterInstitutionsType.name,
    Class: LEADMasterInstitutionsTypeMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADInstitutionsClusterRepository.name,
    Class: LEADInstitutionsClusterRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADMasterInstitutionsClusterFocusRepository.name,
    Class: LEADMasterInstitutionsClusterFocusRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADMasterInstitutionsClusterTypeRepository.name,
    Class: LEADMasterInstitutionsClusterTypeRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADMasterDivisionRepository.name,
    Class: LEADMasterDivisionRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: LEADDivisionInstitutionsRepository.name,
    Class: LEADDivisionInstitutionsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

// MASTER
container.register(users);
container.register(authentication);
container.register(universities);
container.register(program);
// DOMICILE
container.register(master_domiciles);
container.register(domiciles);
container.register(domicile_provicies);
container.register(domicile_regencies);

// BCF
container.register(employeeBCF);
container.register(userBCF);
// MAIN PROGRAM
// CLP

// LEAD
container.register(LEADUsers);
container.register(LEADInstitutions);

// HOL
// events
container.register(HOLCFFRepository);
container.register(HOLCFFUseCase);
container.register(HOLBARepository);
container.register(HOLBAUseCase);
container.register(HOLIYSFRepository);
container.register(HOLIYSFUseCase);
container.register(HOLUsersEventsRepository);
container.register(HOLUsersEventsUseCase);
// users
container.register(HOLUsersRepository);
container.register(HOLUsersUseCase);
// users journey
container.register(HOLUsersAchieveRepository);
container.register(HOLUsersAchieveUseCase);
container.register(HOLUsersExpRepository);
container.register(HOLUsersExpUseCase);
container.register(HOLUsersInvolveRepository);
container.register(HOLUsersInvolveUseCase);
// Recommendations
container.register(HOLRecommendationsUseCase);
container.register(HOLRecommendationsRepository);
// Article
container.register(HOLArticleUseCase);
container.register(HOLArticleRepository);

module.exports = container;
