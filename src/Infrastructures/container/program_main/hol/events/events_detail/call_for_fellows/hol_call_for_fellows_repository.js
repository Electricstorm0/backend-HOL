const pool = require('../../../../../../database/mysql/pool');

// Call For Fellows
const HOLEventsCFFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/HOLEventsCFFRepository');
const HOLEventsCFFRepositoryMySQL = require('../../../../../../repository/program_main/hol/events/events_detail/call_for_fellows/HOLEventsCFFRepositoryMySQL');

const events = [
  // REPOSITORY
  {
    key: HOLEventsCFFRepository.name,
    Class: HOLEventsCFFRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];
module.exports = events;
