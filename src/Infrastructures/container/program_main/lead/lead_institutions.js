const LEADGetInstitutionsByDivisionInstitutionsUseCase = require('../../../../Applications/use_case/Program_Main/LEAD/Institutions/LEADGetInstitutionsByDivisionInstitutionsUseCase');
// REPOSITORY
const LEADDivisionInstitutionsRepository = require('../../../../Domains/program_main/lead/division/LEADDivisionInstitutionsRepository');
const LEADMasterDivisionRepository = require('../../../../Domains/program_main/lead/division/LEADMasterDivisionRepository');
const LEADInstitutionsClusterRepository = require('../../../../Domains/program_main/lead/institutions/cluster/LEADInstitutionsClusterRepository');
const LEADMasterInstitutionsClusterFocusRepository = require('../../../../Domains/program_main/lead/institutions/cluster/LEADMasterInstitutionsClusterFocusRepository');
const LEADInstitutionsRepository = require('../../../../Domains/program_main/lead/institutions/LEADInstitutionsRepository');

const institutions = [
  {
    key: LEADGetInstitutionsByDivisionInstitutionsUseCase.name,
    Class: LEADGetInstitutionsByDivisionInstitutionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'leadDivisionInstitutionsRepository',
          internal: LEADDivisionInstitutionsRepository.name,
        },
        {
          name: 'leadMasterDivisionRepository',
          internal: LEADMasterDivisionRepository.name,
        },
        {
          name: 'leadInstitutionsRepository',
          internal: LEADInstitutionsRepository.name,
        },
        {
          name: 'leadInstitutionsClusterRepository',
          internal: LEADInstitutionsClusterRepository.name,
        },
        {
          name: 'leadMasterInstitutionsClusterFocusRepository',
          internal: LEADMasterInstitutionsClusterFocusRepository.name,
        },
      ],
    },
  },
];

module.exports = institutions;
