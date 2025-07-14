const pool = require('../../../../database/mysql/pool');
const HOLRecommendationsRepository = require('../../../../../Domains/program_main/hol/recommendations/HOLRecommendationsRepository');
const HOLRecommendationsRepositoryMySQL = require('../../../../repository/program_main/hol/recommendations/HOLRecommendationsRepositoryMySQL');
const HOLRecommendationsStatusRepository = require('../../../../../Domains/program_main/hol/recommendations/HOLRecommendationsStatusRepository');
const HOLRecommendationsStatusRepositoryMyQL = require('../../../../repository/program_main/hol/recommendations/HOLRecommendationsStatusRepositoryMySQL');

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
];
module.exports = recommendations;
