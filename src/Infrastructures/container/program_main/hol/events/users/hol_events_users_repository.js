const pool = require('../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersEventsRepository = require('../../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');
const HOLUsersEventsRepositoryMySQL = require('../../../../../repository/program_main/hol/events/HOLUsersEventsRepositoryMySQL');

const users_events = [
  // REPOSITORY
  {
    key: HOLUsersEventsRepository.name,
    Class: HOLUsersEventsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = users_events;
