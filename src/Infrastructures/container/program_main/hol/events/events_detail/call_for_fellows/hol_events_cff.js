const pool = require('../../../../../../database/mysql/pool');

const MasterHOLAreaRepository = require('../../../../../../../Domains/program_main/hol/MasterHOLAreaRepository');
const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
const HOLEventsRepositoryMySQL = require('../../../../../../repository/program_main/hol/events/HOLEventsRepositoryMySQL');
const HOLEventsCFFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/Call_For_Fellows/HOLEventsCFFRepository');
const HOLEventsCFFRepositoryMySQL = require('../../../../../.././repository/program_main/hol/events/events_detail/Call_For_Fellows/HOLEventsCFFRepositoryMySQL');
const CreateCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/CreateCFFUseCase');
const GetCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/GetCFFUseCase');
const GetCFFByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/GetCFFByIdUseCase');
const UpdateCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/UpdateCFFUseCase');
const DeleteCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/events/Call_For_Fellows/DeleteCFFUseCase');
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

  // USE CASE
  {
    key: CreateCFFUseCase.name,
    Class: CreateCFFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsCFFRepository',
          internal: HOLEventsCFFRepository.name,
        },
      ],
    },
  },
  {
    key: GetCFFUseCase.name,
    Class: GetCFFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsCFFRepository',
          internal: HOLEventsCFFRepository.name,
        },
      ],
    },
  },
  {
    key: GetCFFByIdUseCase.name,
    Class: GetCFFByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsCFFRepository',
          internal: HOLEventsCFFRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateCFFUseCase.name,
    Class: UpdateCFFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsCFFRepository',
          internal: HOLEventsCFFRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCFFUseCase.name,
    Class: DeleteCFFUseCase,
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
