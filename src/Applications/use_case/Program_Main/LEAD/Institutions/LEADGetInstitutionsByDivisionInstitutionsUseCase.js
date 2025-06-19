const LEADGetMasterDivision = require('../../../../../Domains/program_main/lead/division/entities/LEADGetMasterDivision');
const LEADGetInstitutions = require('../../../../../Domains/program_main/lead/institutions/entities/LEADGetInstitutions');

class LEADGetInstitutionsByDivisionInstitutionsUseCase {
  constructor({
    leadDivisionInstitutionsRepository, leadMasterDivisionRepository, leadInstitutionsRepository,
    leadInstitutionsClusterRepository, leadMasterInstitutionsClusterFocusRepository,
  }) {
    this._leadDivisionInstitutionsRepository = leadDivisionInstitutionsRepository;
    this._leadMasterDivisionRepository = leadMasterDivisionRepository;
    this._leadInstitutionsRepository = leadInstitutionsRepository;
    this._leadInstitutionsClusterRepository = leadInstitutionsClusterRepository;
    this._leadMasterInstitutionsClusterFocusRepository = leadMasterInstitutionsClusterFocusRepository;
  }

  async execute({ id }) {
    const {
      id_lead_institution: institutionsLeadId, id_lead_division: divisionLeadId,
    } = await this._leadDivisionInstitutionsRepository.readById({ id });
    const institutions = await this._leadInstitutionsRepository.readById({ id: institutionsLeadId }) || {};
    const division = await this._leadMasterDivisionRepository.readById({ id: divisionLeadId }) || {};
    const { id_lead_cluster_focus: clusterFocusLeadId } = await this._leadInstitutionsClusterRepository.readById({ id: institutionsLeadId }) || { id_lead_cluster_focus: '' };
    const { name: institutionsClusterFocus } = await this._leadMasterInstitutionsClusterFocusRepository.readById({ id: clusterFocusLeadId }) || { name: '' };

    return {
      ...new LEADGetInstitutions(institutions),
      ...new LEADGetMasterDivision(division),
      institutionsClusterFocus,
    };
  }
}

module.exports = LEADGetInstitutionsByDivisionInstitutionsUseCase;
