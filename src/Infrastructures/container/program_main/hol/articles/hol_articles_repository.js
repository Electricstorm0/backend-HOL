// REPOSITORY
const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/articles/HOLUsersArticlesRepository');
const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/articles/MasterHOLArticlesRepository');
const HOLUsersArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/articles/HOLUsersArticlesRepositoryMySQL');
const MasterHOLArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/articles/MasterHOLArticlesRepositoryMySQL');
const pool = require('../../../../database/mysql/pool');
const articles = [
  {
    key: MasterHOLArticlesRepository.name,
    Class: MasterHOLArticlesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: HOLUsersArticlesRepository.name,
    Class: HOLUsersArticlesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = articles;
