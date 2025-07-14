const pool = require('../../../../../../database/mysql/pool');

const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
const HOLEventsRepositoryMySQL = require('../../../../../../repository/program_main/hol/events/HOLEventsRepositoryMySQL');
// Bonding Activities
const HOLEventsBARepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/HOLEventsBARepository');
const HOLEventsBARepositoryMySQL = require('../../../../../../repository/program_main/hol/events/events_detail/bonding_activities/HOLEventsBARepositoryMySQL');

const events = [
  // REPOSITORY
  {
    key: HOLEventsRepository.name,
    Class: HOLEventsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLEventsBARepository.name,
    Class: HOLEventsBARepositoryMySQL,
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
