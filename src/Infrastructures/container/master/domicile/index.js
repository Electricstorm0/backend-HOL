const pool = require('../../../database/mysql/pool');
const MasterProvinciesRepository = require('../../../../Domains/domicile/provincies/MasterProvinciesRepository');
const MasterRegenciesRepository = require('../../../../Domains/domicile/regencies/MasterRegenciesRepository');
const MasterProvinciesRepositoryMySQL = require('../../../repository/domicile/province/MasterProvinciesRepositoryMySQL');
const MasterRegenciesRepositoryMySQL = require('../../../repository/domicile/regencie/MasterRegenciesRepositoryMySQL');

const container = [
  {
    key: MasterProvinciesRepository.name,
    Class: MasterProvinciesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: MasterRegenciesRepository.name,
    Class: MasterRegenciesRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
];

module.exports = container;
