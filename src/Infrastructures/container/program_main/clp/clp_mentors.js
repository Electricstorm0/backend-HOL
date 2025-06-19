const pool = require('../../../database/mysql/pool');

const CLPGetMentorsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsUseCase');
const CLPGetMentorsDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsDetailUseCase');
const CLPMentorsRepository = require('../../../../Domains/program_main/clp/mentors/CLPMentorsRepository');
const UsersDetailRepository = require('../../../../Domains/users/UsersDetailRepository');
const CLPGetMentorsByIdUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsByIdUseCase');
const CLPMentorsRepositoryMySQL = require('../../../repository/program_main/clp/mentors/CLPMentorsRepositoryMySQL');
const CLPMentorsDivisionInstitutionsRepository = require('../../../../Domains/program_main/clp/mentors/CLPMentorsDivisionInstitutionsRepository');
const CLPMentorsDivisionInstitutionsRepositoryMySQL = require('../../../repository/program_main/clp/mentors/CLPMentorsDivisionInstitutionsRepositoryMySQL');
const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
const CLPUsersRepository = require('../../../../Domains/program_main/clp/users/CLPUsersRepository');
const CLPGetUsersByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Users/CLPGetUsersByDivisionInstitutionsUseCase');

const mentors = [
  // REPOSITORY
  {
    key: CLPMentorsRepository.name,
    Class: CLPMentorsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPMentorsDivisionInstitutionsRepository.name,
    Class: CLPMentorsDivisionInstitutionsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  // USECASE
  {
    key: CLPGetMentorsUseCase.name,
    Class: CLPGetMentorsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPMentorsRepository',
          internal: CLPMentorsRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetMentorsByIdUseCase.name,
    Class: CLPGetMentorsByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPMentorsRepository',
          internal: CLPMentorsRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'cLPMentorsDivisionInstitutionsRepository',
          internal: CLPMentorsDivisionInstitutionsRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
        {
          name: 'cLPGetUsersByDivisionInstitutionsUseCase',
          internal: CLPGetUsersByDivisionInstitutionsUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetMentorsDetailUseCase.name,
    Class: CLPGetMentorsDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPMentorsRepository',
          internal: CLPMentorsRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
      ],
    },
  },
];

module.exports = mentors;
