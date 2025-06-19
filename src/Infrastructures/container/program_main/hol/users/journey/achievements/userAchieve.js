const pool = require('../../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersAchievementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/HOLUsersAchievementsRepository');
const HOLUsersAchievementsRepositoryMySQL = require('../../../../../../../Infrastructures/repository/program_main/hol/users/journey/achievements/HOLUsersAchievementsRepositoryMySQL');
const HOLCreateUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLCreateUsersAchievementsUseCase');
const HOLGetUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLGetUsersAchievementsUseCase');
const HOLGetUsersAchievementsByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLGetUsersAchievementsByIdUseCase');
const HOLUpdateUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLUpdateUsersAchievementsUseCase');
const HOLDeleteUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/achievements/HOLDeleteUsersAchievementsUseCase');
const achieve = [
  // REPOSITORY
  {
    key: HOLUsersAchievementsRepository.name,
    Class: HOLUsersAchievementsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLUsersAchievementsRepository.name,
    Class: HOLUsersAchievementsRepositoryMySQL,
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
    key: HOLCreateUsersAchievementsUseCase.name,
    Class: HOLCreateUsersAchievementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersAchievementsUseCase.name,
    Class: HOLGetUsersAchievementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersAchievementsByIdUseCase.name,
    Class: HOLGetUsersAchievementsByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateUsersAchievementsUseCase.name,
    Class: HOLUpdateUsersAchievementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteUsersAchievementsUseCase.name,
    Class: HOLDeleteUsersAchievementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
];

module.exports = achieve;
