// REPOSITORY
const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/articles/HOLUsersArticlesRepository');
const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/articles/MasterHOLArticlesRepository');
const HOLUsersArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/articles/HOLUsersArticlesRepositoryMySQL');
const MasterHOLArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/articles/MasterHOLArticlesRepositoryMySQL');
// USECASE
const HOLCreateArticlesUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLCreateArticlesUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLGetAllMyArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLUpdateArticleUseCase');
const HOLDeleteArticleUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLDeleteArticleUseCase');
const pool = require('../../../../database/mysql/pool');
const HOLGetAllArticleUseCase = require('../../../../../Applications/use_case/Program_Main/hol/articles/HOLGetAllArticleUseCase');
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

  //   USE CASE
  {
    key: HOLCreateArticlesUseCase.name,
    Class: HOLCreateArticlesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'MasterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
        {
          name: 'HOLUsersArticlesRepository',
          internal: HOLUsersArticlesRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllMyArticleUseCase.name,
    Class: HOLGetAllMyArticleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'HOLUsersArticlesRepository',
          internal: HOLUsersArticlesRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetAllArticleUseCase.name,
    Class: HOLGetAllArticleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'MasterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
      ],
    },
  },
  {
    key: HOLGetDetailArticleUseCase.name,
    Class: HOLGetDetailArticleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'MasterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
      ],
    },
  },
  {
    key: HOLUpdateArticleUseCase.name,
    Class: HOLUpdateArticleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'MasterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
      ],
    },
  },
  {
    key: HOLDeleteArticleUseCase.name,
    Class: HOLDeleteArticleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'MasterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
      ],
    },
  },
];

module.exports = articles;
