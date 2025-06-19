const pool = require('../../../../database/mysql/pool');
const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/Recomendations/HOLRecommendationsRepository');
const HOLRecommendationsRepositoryMySQL = require('../../../../../Infrastructures/repository/program_main/hol/recomendations/HOLRecommendationsRepositoryMySQL');
const HOLRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/Recomendations/HOLRecommendationsStatusRepository');
const HOLRecommendationsStatusRepositoryMyQL = require('../../../../repository/program_main/hol/recomendations/HOLRecommendationsStatusRepositoryMySQL');

// Usecase
const HOLCreateRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLCreateRecommendationUseCase');
const HOLGetRecommendationByIdUseCase = require('../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByIdUseCase');
const HOLGetRecommendationByUserIdUseCase = require('../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLGetRecommendationByUserIdUseCase');
const HOLUpdateStatusRecommendationUseCase = require('../../../../../Applications/use_case/Program_Main/hol/recommendation/HOLUpdateStatusRecommendationUseCase');

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
];
module.exports = recommendations;
