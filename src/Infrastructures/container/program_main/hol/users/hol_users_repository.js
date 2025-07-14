const pool = require('../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersRepository = require('../../../../../Domains/program_main/hol/users/HOLUsersRepository');
const HOLUsersRepositoryMySQL = require('../../../../repository/program_main/hol/users/HOLUsersRepositoryMySQL');

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
];

module.exports = usersHol;
