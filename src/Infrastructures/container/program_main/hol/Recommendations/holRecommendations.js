const pool = require('../../../../database/mysql/pool');
const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/temp-Recommendations/HOLRecommendationsRepository');
const HOLRecommendationsRepositoryMySQL = require('../../../../repository/program_main/hol/Recommendations/HOLRecommendationsRepositoryMySQL');
const HOLRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/temp-Recommendations/HOLRecommendationsStatusRepository');
const HOLRecommendationsStatusRepositoryMyQL = require('../../../../repository/program_main/hol/Recommendations/HOLRecommendationsStatusRepositoryMySQL');

// Usecase
const HOLCreateRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLCreateRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetRecommendationByUserIdUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLUpdateStatusRecommendationUseCase');
const HOLGetAllRecommendationByStatusUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetAllRecommendationByStatusUseCase');
const HOLGetAllUsersRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetAllUsersRecommendationUseCase');
const HOLGetTotalUsersRecomendationUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetTotalUsersRecomendationUseCase');
const HOLGetTotalUsersRecomendationByStatusUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Recommendations/HOLGetTotalUsersRecomendationByStatusUseCase');

const recommendations = [
  // REPOSITORY
  {
    key: HOLRecommendationsRepository.name,
    Class: HOLRecommendationsRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLRecommendationsStatusRepository.name,
    Class: HOLRecommendationsStatusRepositoryMyQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },

  //   USECASE
  {
    key: HOLCreateRecommendationUseCase.name,
    Class: HOLCreateRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllUsersRecommendationUseCase.name,
    Class: HOLGetAllUsersRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllRecommendationByStatusUseCase.name,
    Class: HOLGetAllRecommendationByStatusUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetRecommendationByIdUseCase.name,
    Class: HOLGetRecommendationByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetRecommendationByUserIdUseCase.name,
    Class: HOLGetRecommendationByUserIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsRepository',
          internal: HOLRecommendationsRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateStatusRecommendationUseCase.name,
    Class: HOLUpdateStatusRecommendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  // GET TOTAL ALUMNI
  {
    key: HOLGetTotalUsersRecomendationUseCase.name,
    Class: HOLGetTotalUsersRecomendationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetTotalUsersRecomendationByStatusUseCase.name,
    Class: HOLGetTotalUsersRecomendationByStatusUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLRecommendationsStatusRepository',
          internal: HOLRecommendationsStatusRepository.name,
        },
      ],
    },
  },
];
module.exports = recommendations;
