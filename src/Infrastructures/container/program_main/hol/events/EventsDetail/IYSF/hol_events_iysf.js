const pool = require('../../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../../Domains/program_main/hol/MasterHOLAreaRepository');
const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/Events/HOLEventsRepository');
const HOLEventsRepositoryMySQL = require('../../../../../../repository/program_main/hol/Events/HOLEventsRepositoryMySQL');
const HOLEventsIYSFRepository = require('../../../../../../../Domains/program_main/hol/Events/EventsDetail/IYSF/HOLEventsIYSFRepository');
const HOLEventsIYSFRepositoryMySQL = require('../../../../../../repository/program_main/hol/Events/EventsDetail/IYSF/HOLEventsIYSFRepositoryMySQL');
const CreateIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/Events/IYSF/HOLCreateIYSFUseCase');
const GetIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/Events/IYSF/HOLGetIYSFUseCase');
const GetIYSFByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/Events/IYSF/HOLGetIYSFByIdUseCase');
const UpdateIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/Events/IYSF/HOLUpdateIYSFUseCase');
const DeleteIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/Events/IYSF/HOLDeleteIYSFUseCase');
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

  // USE CASE
  {
    key: CreateIYSFUseCase.name,
    Class: CreateIYSFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsIYSFRepository',
          internal: HOLEventsIYSFRepository.name,
        },
      ],
    },
  },
  {
    key: GetIYSFUseCase.name,
    Class: GetIYSFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsIYSFRepository',
          internal: HOLEventsIYSFRepository.name,
        },
      ],
    },
  },
  {
    key: GetIYSFByIdUseCase.name,
    Class: GetIYSFByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsIYSFRepository',
          internal: HOLEventsIYSFRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateIYSFUseCase.name,
    Class: UpdateIYSFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'HOLEventsIYSFRepository',
          internal: HOLEventsIYSFRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteIYSFUseCase.name,
    Class: DeleteIYSFUseCase,
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
