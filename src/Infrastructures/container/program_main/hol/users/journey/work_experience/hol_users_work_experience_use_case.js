// REPOSITORY
const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepository');

// USE CASE
const HOLCreateUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLCreateUsersWorkExpUseCase');
const HOLGetUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLGetUsersWorkExpUseCase');
const HOLGetUsersWorkExpByIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLGetUsersWorkExpByIdUseCase');
const HOLUpdateUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLUpdateUsersWorkExpUseCase');
const HOLDeleteUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLDeleteUsersWorkExpUseCase');
const experience = [
  // USE CASE Work Experience
  {
    key: HOLCreateUsersWorkExpUseCase.name,
    Class: HOLCreateUsersWorkExpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'holUsersWorkExpRepository',
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
          name: 'holUsersWorkExpRepository',
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
          name: 'holUsersWorkExpRepository',
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
          name: 'holUsersWorkExpRepository',
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
          name: 'holUsersWorkExpRepository',
          internal: HOLUsersWorkExpRepository.name,
        },
      ],
    },
  },
];

module.exports = experience;
