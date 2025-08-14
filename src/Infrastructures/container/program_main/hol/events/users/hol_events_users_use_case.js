// const MasterHOLAreaRepository = require('../../../../../../');
const HOLEventsRepository = require('../../../../../../Domains/program_main/hol/events/HOLEventsRepository');
const HOLUsersEventsRepository = require('../../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');
const HOLCreateUsersEventsUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLCreateUsersEventsUseCase');
const HOLGetUsersEventByUsersIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsByUsersIdUseCase');
const HOLGetUsersEventsByEventsIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsByEventsIdUseCase');
// get total users events
const HOLGetTotalUsersEventsByEventsTypeUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsByEventsTypeUseCase');
const HOLGetTotalUsersEventsGroupByProgramUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsGroupByProgramUseCase');
const HOLGetTotalUsersEventsByEventsIdAndStatusUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetTotalUsersEventsByEventsIdAndStatusUseCase');
// update dan delete
const HOLUpdateAttendeUsersEventsUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLUpdateAttendeUsersEventsUseCase');
const HOLUpdateStatusUsersEventsUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLUpdateStatusUsersEventsUseCase');
const HOLDeleteUsersEventsUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLDeleteUsersEventsUseCase');
const HOLGetUsersEventsStatusByUsersIdUseCase = require('../../../../../../Applications/use_case/Program_Main/HOL/Events/Users/HOLGetUsersEventsStatusByUsersIdUseCase');
const users_events = [
  {
    key: HOLCreateUsersEventsUseCase.name,
    Class: HOLCreateUsersEventsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holEventsRepository',
          internal: HOLEventsRepository.name,
        },
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  //
  {
    key: HOLGetTotalUsersEventsByEventsTypeUseCase.name,
    Class: HOLGetTotalUsersEventsByEventsTypeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersEventsGroupByProgramUseCase.name,
    Class: HOLGetTotalUsersEventsGroupByProgramUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersEventsByEventsIdAndStatusUseCase.name,
    Class: HOLGetTotalUsersEventsByEventsIdAndStatusUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  //

  {
    key: HOLGetUsersEventByUsersIdUseCase.name,
    Class: HOLGetUsersEventByUsersIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersEventsStatusByUsersIdUseCase.name,
    Class: HOLGetUsersEventsStatusByUsersIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersEventsByEventsIdUseCase.name,
    Class: HOLGetUsersEventsByEventsIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateAttendeUsersEventsUseCase.name,
    Class: HOLUpdateAttendeUsersEventsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateStatusUsersEventsUseCase.name,
    Class: HOLUpdateStatusUsersEventsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteUsersEventsUseCase.name,
    Class: HOLDeleteUsersEventsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersEventsRepository',
          internal: HOLUsersEventsRepository.name,
        },
      ],
    },
  },
];

module.exports = users_events;
