// REPOSITORY
const HOLUsersAchievementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/HOLUsersAchievementsRepository');

// USE CASE
const HOLCreateUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Achievements/HOLCreateUsersAchievementsUseCase');
const HOLGetUsersAchievementsByUsersIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Achievements/HOLGetUsersAchievementsByUsersIdUseCase');
const HOLUpdateUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Achievements/HOLUpdateUsersAchievementsUseCase');
const HOLDeleteUsersAchievementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Achievements/HOLDeleteUsersAchievementsUseCase');
const achieve = [
  // USE CASE Achievements
  {
    key: HOLCreateUsersAchievementsUseCase.name,
    Class: HOLCreateUsersAchievementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },

  {
    key: HOLGetUsersAchievementsByUsersIdUseCase.name,
    Class: HOLGetUsersAchievementsByUsersIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersAchievementsRepository',
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
          name: 'holUsersAchievementsRepository',
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
          name: 'holUsersAchievementsRepository',
          internal: HOLUsersAchievementsRepository.name,
        },
      ],
    },
  },
];

module.exports = achieve;
