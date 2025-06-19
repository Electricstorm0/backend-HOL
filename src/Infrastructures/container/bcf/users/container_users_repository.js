const pool = require('../../../database/mysql/pool');
const UsersBCFRepository = require('../../../../Domains/bcf/UsersBCFRepository');
const UsersBCFRepositoryMySQL = require('../../../repository/bcf/UsersBCFRepositoryMySQL');

const repository = [
  {
    key: UsersBCFRepository.name,
    Class: UsersBCFRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = repository;
