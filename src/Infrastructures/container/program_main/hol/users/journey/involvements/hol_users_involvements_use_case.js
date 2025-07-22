const HOLUsersInvolvementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepository');
const HOLUsersEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');

// USECASE
const HOLCreateUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLCreateUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLGetUsersInvolvementsByIdUseCase');
const HOLGetDetailInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLGetDetailInvolvementsUseCase');
const HOLUpdateUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLUpdateUsersInvolvementsUseCase');
const HOLDeleteUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/Involvements/HOLDeleteUsersInvolvementsUseCase');
const involve = [
  // USE CASE Involvements
  {
    key: HOLCreateUsersInvolvementsUseCase.name,
    Class: HOLCreateUsersInvolvementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
  // {
  //   key: HOLGetUsersInvolvementsUseCase.name,
  //   Class: HOLGetUsersInvolvementsUseCase,
  //   parameter: {
  //     injectType: 'destructuring',
  //     dependencies: [
  //       {
  //         name: 'holUsersInvolvementsRepository',
  //         internal: HOLUsersInvolvementsRepository.name,
  //       },
  //     ],
  //   },
  // },
  {
    key: HOLGetUsersInvolvementsByIdUseCase.name,
    Class: HOLGetUsersInvolvementsByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetDetailInvolvementsUseCase.name,
    Class: HOLGetDetailInvolvementsUseCase,
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
    key: HOLUpdateUsersInvolvementsUseCase.name,
    Class: HOLUpdateUsersInvolvementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteUsersInvolvementsUseCase.name,
    Class: HOLDeleteUsersInvolvementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
];

module.exports = involve;
