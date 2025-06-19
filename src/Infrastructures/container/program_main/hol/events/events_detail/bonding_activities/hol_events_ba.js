const pool = require('../../../../../../database/mysql/pool');

const MasterHOLAreaRepository = require('../../../../../../../Domains/program_main/hol/MasterHOLAreaRepository');
const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
const HOLEventsRepositoryMySQL = require('../../../../../../repository/program_main/hol/events/HOLEventsRepositoryMySQL');
const HOLEventsBARepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/Bonding_Activities/HOLEventsBARepository');
const HOLEventsBARepositoryMySQL = require('../../../../../../repository/program_main/hol/events/events_detail/Bonding_Activities/HOLEventsBARepositoryMySQL');
const CreateBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/CreateBAUseCase');
const GetBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/GetBAUseCase');
const GetBAByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/GetBAByIdUseCase');
const UpdateBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/UpdateBAUseCase');
const DeleteBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Bonding_Activities/DeleteBAUseCase');
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

  // USE CASE
  {
    key: CreateBAUseCase.name,
    Class: CreateBAUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsBARepository',
          internal: HOLEventsBARepository.name,
        },
      ],
    },
  },
  {
    key: GetBAUseCase.name,
    Class: GetBAUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsBARepository',
          internal: HOLEventsBARepository.name,
        },
      ],
    },
  },
  {
    key: GetBAByIdUseCase.name,
    Class: GetBAByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsBARepository',
          internal: HOLEventsBARepository.name,
        },
      ],
    },
  },
  {
    key: UpdateBAUseCase.name,
    Class: UpdateBAUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsBARepository',
          internal: HOLEventsBARepository.name,
        },
      ],
    },
  },
  {
    key: DeleteBAUseCase.name,
    Class: DeleteBAUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
      ],
    },
  },
];

module.exports = events;
