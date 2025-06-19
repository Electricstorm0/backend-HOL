const pool = require('../../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersInvolvementsRepository = require('../../../../../../../Domains/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepository');
const HOLUsersInvolvementsRepositoryMySQL = require('../../../../../../repository/program_main/hol/users/journey/involvements/HOLUsersInvolvementsRepositoryMySQL');
const HOLUsersEventsRepository = require('../../../../../../../Domains/program_main/hol/events/HOLUsersEventsRepository');
const HOLUsersEventsRepositoryMySQL = require('../../../../../../../Infrastructures/repository/program_main/hol/events/HOLUsersEventsRepositoryMySQL');

// USECASE
const HOLCreateUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLCreateUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetUsersInvolvementsUseCase');
const HOLGetUsersInvolvementsByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetUsersInvolvementsByIdUseCase');
const HOLGetDetailInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLGetDetailInvolvementsUseCase');
const HOLUpdateUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLUpdateUsersInvolvementsUseCase');
const HOLDeleteUsersInvolvementsUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/involvements/HOLDeleteUsersInvolvementsUseCase');
const involve = [
  // REPOSITORY
  {
    key: HOLUsersInvolvementsRepository.name,
    Class: HOLUsersInvolvementsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLUsersEventsRepository.name,
    Class: HOLUsersEventsRepositoryMySQL,
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
    key: HOLCreateUsersInvolvementsUseCase.name,
    Class: HOLCreateUsersInvolvementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersInvolvementsUseCase.name,
    Class: HOLGetUsersInvolvementsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersInvolvementsByIdUseCase.name,
    Class: HOLGetUsersInvolvementsByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersInvolvementsRepository',
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
          name: 'HOLUsersEventsRepository',
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
          name: 'HOLUsersInvolvementsRepository',
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
          name: 'HOLUsersInvolvementsRepository',
          internal: HOLUsersInvolvementsRepository.name,
        },
      ],
    },
  },
];

module.exports = involve;
