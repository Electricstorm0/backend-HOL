const pool = require('../../../../../../database/mysql/pool');

// REPOSITORY
const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepository');
const HOLUsersWorkExpRepositoryMySQL = require('../../../../../../repository/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepositoryMySQL');

const experience = [
  // REPOSITORY
  {
    key: HOLUsersWorkExpRepository.name,
    Class: HOLUsersWorkExpRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = experience;
