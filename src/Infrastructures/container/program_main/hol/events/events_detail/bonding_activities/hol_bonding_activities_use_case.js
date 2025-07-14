const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
// Bonding Activities
const HOLEventsBARepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/bonding_activities/HOLEventsBARepository');

// Bonding Activities UseCase
const CreateBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLCreateBAUseCase');
const GetBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLGetBAUseCase');
const GetBAByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLGetBAByIdUseCase');
const UpdateBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLUpdateBAUseCase');
const DeleteBAUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/BondingActivities/HOLDeleteBAUseCase');

const events = [
  // Bonding Activities
  {
    key: CreateBAUseCase.name,
    Class: CreateBAUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsBARepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsBARepository',
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
          name: 'holEventsBARepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsBARepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
      ],
    },
  },
];
module.exports = events;
