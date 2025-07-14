const HOLEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
// IYSF
const HOLEventsIYSFRepository = require('../../../../../../../Domains/program_main/hol/events/events_detail/iysf/HOLEventsIYSFRepository');

// IYSF UseCase
const CreateIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/IYSF/HOLCreateIYSFUseCase');
const GetIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/IYSF/HOLGetIYSFUseCase');
const GetIYSFByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/IYSF/HOLGetIYSFByIdUseCase');
const UpdateIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/IYSF/HOLUpdateIYSFUseCase');
const DeleteIYSFUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Events/IYSF/HOLDeleteIYSFUseCase');
const events = [
  {
    key: CreateIYSFUseCase.name,
    Class: CreateIYSFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsIYSFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsIYSFRepository',
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
          name: 'holEventsIYSFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holEventsIYSFRepository',
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
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
      ],
    },
  },
];
module.exports = events;
