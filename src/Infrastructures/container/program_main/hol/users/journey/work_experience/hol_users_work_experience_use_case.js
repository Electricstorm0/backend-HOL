// REPOSITORY
const HOLUsersWorkExpRepository = require('../../../../../../../Domains/program_main/hol/users/journey/work_experience/HOLUsersWorkExpRepository');

// USE CASE
const HOLCreateUsersWorkExpUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLCreateUsersWorkExpUseCase');
const HOLGetUsersWorkExpByUsersIdUseCase = require('../../../../../../../Applications/use_case/Program_Main/HOL/Users/Journey/WorkExperience/HOLGetUsersWorkExpByUsersIdUseCase');
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
    key: HOLGetUsersWorkExpByUsersIdUseCase.name,
    Class: HOLGetUsersWorkExpByUsersIdUseCase,
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
