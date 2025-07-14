const HOLUsersArticlesRepository = require('../../../../../Domains/program_main/hol/articles/HOLUsersArticlesRepository');
const MasterHOLArticlesRepository = require('../../../../../Domains/program_main/hol/articles/MasterHOLArticlesRepository');
// USECASE
const HOLCreateArticlesUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLCreateArticlesUseCase');
const HOLGetAllMyArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllMyArticleUseCase');
const HOLGetDetailArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetDetailArticleUseCase');
const HOLUpdateArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLUpdateArticleUseCase');
const HOLDeleteArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLDeleteArticleUseCase');
const HOLGetAllArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllArticleUseCase');
const HOLUpdateStatusArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLUpdateStatusArticleUseCase');
const HOLGetAllUsersArticleUseCase = require('../../../../../Applications/use_case/Program_Main/HOL/Articles/HOLGetAllUsersArticleUseCase');
const articles = [
  {
    key: HOLCreateArticlesUseCase.name,
    Class: HOLCreateArticlesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'masterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
        {
          name: 'holUsersArticlesRepository',
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
          name: 'holUsersArticlesRepository',
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
          name: 'holUsersArticlesRepository',
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
          name: 'masterHOLArticlesRepository',
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
          name: 'masterHOLArticlesRepository',
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
          name: 'masterHOLArticlesRepository',
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
          name: 'holUsersArticlesRepository',
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
          name: 'masterHOLArticlesRepository',
          internal: MasterHOLArticlesRepository.name,
        },
      ],
    },
  },
];

module.exports = articles;
