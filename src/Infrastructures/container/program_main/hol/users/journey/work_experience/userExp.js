const pool = require('../../../../../../database/mysql/pool');

// const MasterHOLAreaRepository = require('../../../../../../');
const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepository');
const HOLUsersWorkExpRepositoryMySQL = require('../../../../../../repository/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepositoryMySQL');
const HOLCreateUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLCreateUsersWorkExpUseCase');
const HOLGetUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLGetUsersWorkExpUseCase');
const HOLGetUsersWorkExpByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLGetUsersWorkExpByIdUseCase');
const HOLUpdateUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLUpdateUsersWorkExpUseCase');
const HOLDeleteUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/hol/users/journey/work_experience/HOLDeleteUsersWorkExpUseCase');
const experience = [
  // REPOSITORY
  {
    key: HOLUsersWorkExpRepository.name,
    Class: HOLUsersWorkExpRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLUsersWorkExpRepository.name,
    Class: HOLUsersWorkExpRepositoryMySQL,
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
    key: HOLCreateUsersWorkExpUseCase.name,
    Class: HOLCreateUsersWorkExpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersWorkExpUseCase.name,
    Class: HOLGetUsersWorkExpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetUsersWorkExpByIdUseCase.name,
    Class: HOLGetUsersWorkExpByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateUsersWorkExpUseCase.name,
    Class: HOLUpdateUsersWorkExpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteUsersWorkExpUseCase.name,
    Class: HOLDeleteUsersWorkExpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
];

module.exports = experience;
