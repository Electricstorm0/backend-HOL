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
// CLP
const CLPUsers = require('./container/program_main/clp/clp_users');
const CLPEvaluations = require('./container/program_main/clp/clp_evaluations');
const CLPClassifications = require('./container/program_main/clp/clp_classifications');
const CLPMentors = require('./container/program_main/clp/clp_mentors');
const CLPInstitutions = require('./container/program_main/clp/clp_institutions');
// LEAD
const LEADUsers = require('./container/program_main/lead/lead_users');
const LEADInstitutions = require('./container/program_main/lead/lead_institutions');
// HOL
const HOLCFF = require('./container/program_main/hol/Events/EventsDetail/CallForFellows/hol_events_cff');
const HOLBA = require('./container/program_main/hol/Events/EventsDetail/BondingActivities/hol_events_ba');
const HOLIYSF = require('./container/program_main/hol/Events/EventsDetail/IYSF/hol_events_iysf');
const HOLUsersEvents = require('./container/program_main/hol/Events/Users/hol_events_users');
const HOLUsers = require('./container/program_main/hol/Users/holUsers');
const HOLUsersAchieve = require('./container/program_main/hol/Users/Journey/Achievements/UserAchievements');
const HOLUsersExp = require('./container/program_main/hol/Users/Journey/WorkExperience/UserExperience');
const HOLUsersInvolve = require('./container/program_main/hol/Users/Journey/Involvements/UserInvolvements');
const HOLRecommendations = require('./container/program_main/hol/Recommendations/holRecommendations');
const HOLArticle = require('./container/program_main/hol/articles/hol_articles');

// DOMAIN REPOSITORY CLP
const CLPUsersRepository = require('../Domains/program_main/clp/users/CLPUsersRepository');
const CLPUsersRepositoryMySQL = require('./repository/program_main/clp/users/CLPUsersRepositoryMySQL');

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
container.register([
  {
    key: CLPUsersRepository.name,
    Class: CLPUsersRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
]);

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
container.register(CLPUsers);
container.register(CLPMentors);
container.register(CLPEvaluations);
container.register(CLPClassifications);
container.register(CLPInstitutions);

// LEAD
container.register(LEADUsers);
container.register(LEADInstitutions);

// HOL
container.register(HOLCFF);
container.register(HOLBA);
container.register(HOLIYSF);
container.register(HOLUsersEvents);
container.register(HOLUsers);
container.register(HOLUsersAchieve);
container.register(HOLUsersExp);
container.register(HOLUsersInvolve);
container.register(HOLRecommendations);
container.register(HOLArticle);

module.exports = container;
