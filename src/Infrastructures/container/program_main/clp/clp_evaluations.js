const pool = require('../../../database/mysql/pool');

const CLPEvaluationsFinalRepository = require('../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalRepository');
const CLPEvaluationsFinalRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/final/CLPEvaluationsFinalRepositoryMySQL');
const CLPEvaluationsFinalBCFRepository = require('../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalBCFRepository');
const CLPEvaluationsFinalBCFRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/final/CLPEvaluationsFinalBCFRepositoryMySQL');
const CLPEvaluationsFinalHSRepository = require('../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalHSRepository');
const CLPEvaluationsFinalHSRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/final/CLPEvaluationsFinalHSRepositoryMySQL');
const CLPEvaluationsFinalSSRepository = require('../../../../Domains/program_main/clp/evaluations/final/CLPEvaluationsFinalSSRepository');
const CLPEvaluationsFinalSSRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/final/CLPEvaluationsFinalSSRepositoryMySQL');
const CLPUsersRepository = require('../../../../Domains/program_main/clp/users/CLPUsersRepository');

const CLPGetMentorsDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Mentors/CLPGetMentorsDetailUseCase');
const UsersDetailRepository = require('../../../../Domains/users/UsersDetailRepository');
const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
const GetUniversitiesUsersUseCase = require('../../../../Applications/use_case/Universities/GetUniversitiesUsersUseCase');
const CLPGetEvaluationsFinalDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/Final/CLPGetEvaluationsFinalDetailUseCase');
const CLPGetEvaluationsFinalBCFUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/Final/CLPGetEvaluationsFinalBCFUseCase');
const CLPGetEvaluationsFinalHSUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/Final/CLPGetEvaluationsFinalHSUseCase');
const CLPGetEvaluationsFinalSSUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/Final/CLPGetEvaluationsFinalSSUseCase');
const CLPGetEvaluationsPATHasEvaluatedUsersUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/PAT/CLPGetEvaluationsPATHasEvaluatedUsersUseCase');
const CLPPostEvaluationsPATUsersUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/PAT/CLPPostEvaluationsPATUsersUseCase');

const CLPMasterClassificationsFinalBCFRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalBCFRepository');
const CLPMasterClassificationsFinalHSRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalHSRepository');
const CLPMasterClassificationsFinalSSRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalSSRepository');
const CLPEvaluationsPATFinalRepository = require('../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATFinalRepository');
const CLPEvaluationsPATFinalRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/pat/CLPEvaluationsPATFinalRepositoryMySQL');
const CLPEvaluationsPATRepository = require('../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATRepository');
const CLPEvaluationsPATRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/pat/CLPEvaluationsPATRepositoryMySQL');
const CLPEvaluationsPATScoreRepository = require('../../../../Domains/program_main/clp/evaluations/pat/CLPEvaluationsPATScoreRepository');
const CLPEvaluationsPATScoreRepositoryMySQL = require('../../../repository/program_main/clp/evaluations/pat/CLPEvaluationsPATScoreRepositoryMySQL');
const CLPRefreshEvaluationsFinalUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/CLPRefreshEvaluationsFinalUseCase');
const CLPGetEvaluationsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/CLPGetEvaluationsUseCase');
const CLPGetEvaluationsPATProgressUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/PAT/CLPGetEvaluationsPATProgressUseCase');
const CLPGetEvaluationsDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Evaluations/CLPGetEvaluationsDetailUseCase');

const evaluations = [
  // TRANSACTION REPOSITORY
  {
    key: CLPEvaluationsFinalRepository.name,
    Class: CLPEvaluationsFinalRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsFinalBCFRepository.name,
    Class: CLPEvaluationsFinalBCFRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsFinalHSRepository.name,
    Class: CLPEvaluationsFinalHSRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsFinalSSRepository.name,
    Class: CLPEvaluationsFinalSSRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsPATFinalRepository.name,
    Class: CLPEvaluationsPATFinalRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsPATRepository.name,
    Class: CLPEvaluationsPATRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPEvaluationsPATScoreRepository.name,
    Class: CLPEvaluationsPATScoreRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  // USE CASE
  // EVALUATIONS FINAL
  {
    key: CLPGetEvaluationsFinalDetailUseCase.name,
    Class: CLPGetEvaluationsFinalDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalRepository',
          internal: CLPEvaluationsFinalRepository.name,
        },
        {
          name: 'cLPGetMentorsDetailUseCase',
          internal: CLPGetMentorsDetailUseCase.name,
        },
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
        {
          name: 'getUniversitiesUsersUseCase',
          internal: GetUniversitiesUsersUseCase.name,
        },
        {
          name: 'cLPGetEvaluationsFinalBCFUseCase',
          internal: CLPGetEvaluationsFinalBCFUseCase.name,
        },
        {
          name: 'cLPGetEvaluationsFinalHSUseCase',
          internal: CLPGetEvaluationsFinalHSUseCase.name,
        },
        {
          name: 'cLPGetEvaluationsFinalSSUseCase',
          internal: CLPGetEvaluationsFinalSSUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetEvaluationsFinalBCFUseCase.name,
    Class: CLPGetEvaluationsFinalBCFUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalBCFRepository',
          internal: CLPEvaluationsFinalBCFRepository.name,
        },
        {
          name: 'cLPMasterClassificationsFinalBCFRepository',
          internal: CLPMasterClassificationsFinalBCFRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetEvaluationsFinalHSUseCase.name,
    Class: CLPGetEvaluationsFinalHSUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalHSRepository',
          internal: CLPEvaluationsFinalHSRepository.name,
        },
        {
          name: 'cLPMasterClassificationsFinalHSRepository',
          internal: CLPMasterClassificationsFinalHSRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetEvaluationsFinalSSUseCase.name,
    Class: CLPGetEvaluationsFinalSSUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalSSRepository',
          internal: CLPEvaluationsFinalSSRepository.name,
        },
        {
          name: 'cLPMasterClassificationsFinalSSRepository',
          internal: CLPMasterClassificationsFinalSSRepository.name,
        },
      ],
    },
  },
  {
    key: CLPRefreshEvaluationsFinalUseCase.name,
    Class: CLPRefreshEvaluationsFinalUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalRepository',
          internal: CLPEvaluationsFinalRepository.name,
        },
      ],
    },
  },
  // EVALUATIONS PAT
  {
    key: CLPGetEvaluationsPATHasEvaluatedUsersUseCase.name,
    Class: CLPGetEvaluationsPATHasEvaluatedUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'usersDetailRepository',
          internal: UsersDetailRepository.name,
        },
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPEvaluationsPATFinalRepository',
          internal: CLPEvaluationsPATFinalRepository.name,
        },
      ],
    },
  },
  {
    key: CLPPostEvaluationsPATUsersUseCase.name,
    Class: CLPPostEvaluationsPATUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPEvaluationsFinalRepository',
          internal: CLPEvaluationsFinalRepository.name,
        },
        {
          name: 'cLPEvaluationsPATRepository',
          internal: CLPEvaluationsPATRepository.name,
        },
        {
          name: 'cLPEvaluationsPATFinalRepository',
          internal: CLPEvaluationsPATFinalRepository.name,
        },
        {
          name: 'cLPEvaluationsPATScoreRepository',
          internal: CLPEvaluationsPATScoreRepository.name,
        },
        {
          name: 'cLPEvaluationsFinalBCFRepository',
          internal: CLPEvaluationsFinalBCFRepository.name,
        },
        {
          name: 'cLPRefreshEvaluationsFinalUseCase',
          internal: CLPRefreshEvaluationsFinalUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetEvaluationsPATProgressUseCase.name,
    Class: CLPGetEvaluationsPATProgressUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPEvaluationsPATFinalRepository',
          internal: CLPEvaluationsPATFinalRepository.name,
        },
      ],
    },
  },
  // EVALUATIONS
  {
    key: CLPGetEvaluationsUseCase.name,
    Class: CLPGetEvaluationsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPEvaluationsFinalRepository',
          internal: CLPEvaluationsFinalRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
        {
          name: 'cLPGetEvaluationsPATProgressUseCase',
          internal: CLPGetEvaluationsPATProgressUseCase.name,
        },
        {
          name: 'cLPGetMentorsDetailUseCase',
          internal: CLPGetMentorsDetailUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetEvaluationsDetailUseCase.name,
    Class: CLPGetEvaluationsDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPUsersRepository',
          internal: CLPUsersRepository.name,
        },
        {
          name: 'cLPGetEvaluationsFinalDetailUseCase',
          internal: CLPGetEvaluationsFinalDetailUseCase.name,
        },
        {
          name: 'cLPGetEvaluationsPATProgressUseCase',
          internal: CLPGetEvaluationsPATProgressUseCase.name,
        },
      ],
    },
  },
];

module.exports = evaluations;
