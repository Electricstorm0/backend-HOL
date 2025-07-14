const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
// Call For Fellows
const HOLEventsCFFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/call_for_fellows/HOLEventsCFFRepository');

// Call For Fellows UseCase
const CreateCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/CallForFellows/HOLCreateCFFUseCase');
const GetCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/CallForFellows/HOLGetCFFUseCase');
const GetCFFByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/CallForFellows/HOLGetCFFByIdUseCase');
const UpdateCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/CallForFellows/HOLUpdateCFFUseCase');
const DeleteCFFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/CallForFellows/HOLDeleteCFFUseCase');
const events = [
  // CFF
  {
    key: CreateCFFUseCase.name,
    Class: CreateCFFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsCFFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsCFFRepository',
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
          name: 'holEventsCFFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsCFFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
      ],
    },
  },
];
module.exports = events;
