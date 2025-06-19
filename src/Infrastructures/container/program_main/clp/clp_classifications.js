const pool = require('../../../database/mysql/pool');

const CLPGetClassificationsPATUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Classifications/PAT/CLPGetClassificationsPATUseCase');
const CLPMasterClassificationsPATRepository = require('../../../../Domains/program_main/clp/classifications/pat/CLPMasterClassificationsPATRepository');
const CLPMasterClassificationsPATRepositoryMySQL = require('../../../repository/program_main/clp/classifications/pat/CLPMasterClassificationsPATRepositoryMySQL');
const CLPMasterClassificationsFinalBCFRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalBCFRepository');
const CLPMasterClassificationsFinalBCFRepositoryMySQL = require('../../../repository/program_main/clp/classifications/final/CLPMasterClassificationsFinalBCFRepositoryMySQL');
const CLPMasterClassificationsFinalHSRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalHSRepository');
const CLPMasterClassificationsFinalHSRepositoryMySQL = require('../../../repository/program_main/clp/classifications/final/CLPMasterClassificationsFinalHSRepositoryMySQL');
const CLPMasterClassificationsFinalSSRepository = require('../../../../Domains/program_main/clp/classifications/final/CLPMasterClassificationsFinalSSRepository');
const CLPMasterClassificationsFinalSSRepositoryMySQL = require('../../../repository/program_main/clp/classifications/final/CLPMasterClassificationsFinalSSRepositoryMySQL');
const CLPGetClassificationsHSUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Classifications/Final/Hard-Skill/CLPGetClassificationsHSUseCase');
const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
const CLPGetClassificationsHSByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Classifications/Final/Hard-Skill/CLPGetClassificationsHSByDivisionInstitutionsUseCase');

const classifications = [
  // REPOSITORY
  {
    key: CLPMasterClassificationsPATRepository.name,
    Class: CLPMasterClassificationsPATRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPMasterClassificationsFinalBCFRepository.name,
    Class: CLPMasterClassificationsFinalBCFRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPMasterClassificationsFinalHSRepository.name,
    Class: CLPMasterClassificationsFinalHSRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CLPMasterClassificationsFinalSSRepository.name,
    Class: CLPMasterClassificationsFinalSSRepositoryMySQL,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  // USE CASE
  // PAT
  {
    key: CLPGetClassificationsPATUseCase.name,
    Class: CLPGetClassificationsPATUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPMasterClassificationsPATRepository',
          internal: CLPMasterClassificationsPATRepository.name,
        },
      ],
    },
  },
  // FINAL
  {
    key: CLPGetClassificationsHSUseCase.name,
    Class: CLPGetClassificationsHSUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPMasterClassificationsFinalHSRepository',
          internal: CLPMasterClassificationsFinalHSRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
      ],
    },
  },
  {
    key: CLPGetClassificationsHSByDivisionInstitutionsUseCase.name,
    Class: CLPGetClassificationsHSByDivisionInstitutionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cLPMasterClassificationsFinalHSRepository',
          internal: CLPMasterClassificationsFinalHSRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
      ],
    },
  },
];

module.exports = classifications;
