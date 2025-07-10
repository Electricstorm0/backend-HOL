// REPOSITORY
const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/Articles/HOLUsersArticlesRepository');
const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/Articles/MasterHOLArticlesRepository');
const HOLUsersArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/Articles/HOLUsersArticlesRepositoryMySQL');
const MasterHOLArticlesRepositoryMySQL = require('../../../../repository/program_main/hol/Articles/MasterHOLArticlesRepositoryMySQL');
// USECASE
const HOLCreateArticlesUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLCreateArticlesUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLGetAllMyArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLUpdateArticleUseCase');
const HOLDeleteArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLDeleteArticleUseCase');
const pool = require('../../../../database/mysql/pool');
const HOLGetAllArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLGetAllArticleUseCase');
const HOLUpdateStatusArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLUpdateStatusArticleUseCase');
const HOLGetAllUsersArticleUseCase = require('../../../../../Applications/use_case/Program_Main/temp-HOL/Articles/HOLGetAllUsersArticleUseCase');
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
    key: HOLGetAllUsersArticleUseCase.name,
    Class: HOLGetAllUsersArticleUseCase,
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
    key: HOLUpdateStatusArticleUseCase.name,
    Class: HOLUpdateStatusArticleUseCase,
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
