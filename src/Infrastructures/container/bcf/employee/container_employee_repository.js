const pool = require('../../../database/mysql/pool');
const MasterEmployeesBCFRepository = require('../../../../Domains/bcf/MasterEmployeesBCFRepository');
const MasterEmployeesBCFRepositoryMySQL = require('../../../repository/bcf/MasterEmployeesBCFRepositoryMySQL');

const repository = [
  {
    key: MasterEmployeesBCFRepository.name,
    Class: MasterEmployeesBCFRepositoryMySQL,
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
