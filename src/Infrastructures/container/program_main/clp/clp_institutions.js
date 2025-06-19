const CLPGetInstitutionsDetailUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Institutions/CLPGetInstitutionsDetailUseCase');
const CLPGetInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/CLP/Institutions/CLPGetInstitutionsUseCase');
const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
const LEADDivisionInstitutionsRepository = require('../../../../Domains/program_main/lead/division/LEADDivisionInstitutionsRepository');
const LEADMasterDivisionRepository = require('../../../../Domains/program_main/lead/division/LEADMasterDivisionRepository');
const LEADInstitutionsRepository = require('../../../../Domains/program_main/lead/institutions/LEADInstitutionsRepository');

const institutions = [
  // USECASE
  {
    key: CLPGetInstitutionsUseCase.name,
    Class: CLPGetInstitutionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'lEADInstitutionsRepository',
          internal: LEADInstitutionsRepository.name,
        },
      ],
    },
  },
  {
    key: CLPGetInstitutionsDetailUseCase.name,
    Class: CLPGetInstitutionsDetailUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'lEADInstitutionsRepository',
          internal: LEADInstitutionsRepository.name,
        },
        {
          name: 'lEADDivisionInstitutionsRepository',
          internal: LEADDivisionInstitutionsRepository.name,
        },
        {
          name: 'lEADMasterDivisionRepository',
          internal: LEADMasterDivisionRepository.name,
        },
        {
          name: 'lEADGetInstitutionsByDivisionInstitutionsUseCase',
          internal: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
        },
      ],
    },
  },
];

module.exports = institutions;
