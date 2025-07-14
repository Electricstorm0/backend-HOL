const pool = require('../../../../../../database/mysql/pool');

// REPOSITORY
const HOLUsersAchievementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/achievements/HOLUsersAchievementsRepository');
const HOLUsersAchievementsRepositoryMySQL = require('../../../../../../repository/program_main/hol/users/journey/achievements/HOLUsersAchievementsRepositoryMySQL');
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
];

module.exports = achieve;
