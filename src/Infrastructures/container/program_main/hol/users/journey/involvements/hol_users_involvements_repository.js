const pool = require('../../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersInvolvementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepository');
const HOLUsersInvolvementsRepositoryMySQL = require('../../../../../../repository/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepositoryMySQL');

const involve = [
  // REPOSITORY
  {
    key: HOLUsersInvolvementsRepository.name,
    Class: HOLUsersInvolvementsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = involve;
