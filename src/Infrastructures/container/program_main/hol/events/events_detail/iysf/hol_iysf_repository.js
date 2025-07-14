const pool = require('../../../../../../database/mysql/pool');

// IYSF
const HOLEventsIYSFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/HOLEventsIYSFRepository');
const HOLEventsIYSFRepositoryMySQL = require('../../../../../../repository/program_main/hol/events/events_detail/iysf/HOLEventsIYSFRepositoryMySQL');

const events = [
  // REPOSITORY

  {
    key: HOLEventsIYSFRepository.name,
    Class: HOLEventsIYSFRepositoryMySQL,
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
