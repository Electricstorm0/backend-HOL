const CLPGetDetailEvaluationsFinal = require('../../../../../../Domains/program_main/clp/evaluations/final/entities/CLPGetDetailEvaluationsFinal');

class CLPGetEvaluationsFinalDetailUseCase {
  constructor({
    cLPEvaluationsFinalRepository, cLPGetMentorsDetailUseCase, cLPUsersRepository, usersDetailRepository,
    lEADGetInstitutionsByDivisionInstitutionsUseCase, getUniversitiesUsersUseCase,
    cLPGetEvaluationsFinalBCFUseCase, cLPGetEvaluationsFinalHSUseCase, cLPGetEvaluationsFinalSSUseCase,
  }) {
    this._cLPEvaluationsFinalRepository = cLPEvaluationsFinalRepository;
    this._cLPGetMentorsDetailUseCase = cLPGetMentorsDetailUseCase;
    this._cLPUsersRepository = cLPUsersRepository;
    this._usersDetailRepository = usersDetailRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._getUniversitiesUsersUseCase = getUniversitiesUsersUseCase;
    this._cLPGetEvaluationsFinalBCFUseCase = cLPGetEvaluationsFinalBCFUseCase;
    this._cLPGetEvaluationsFinalHSUseCase = cLPGetEvaluationsFinalHSUseCase;
    this._cLPGetEvaluationsFinalSSUseCase = cLPGetEvaluationsFinalSSUseCase;
  }

  async execute({ id: usersId }, { batchId }) {
    const {
      id: usersCLPId,
      id_lead_division_institutions: divisionInstitutionsId,
    } = await this._cLPUsersRepository.readyByBatchAndUsersId({ batchId, usersId });
    await this._cLPEvaluationsFinalRepository.verifyUsersHasAssigned({ id: usersCLPId });
    const evaluationsFinal = await this._cLPEvaluationsFinalRepository.readById({ id: usersCLPId });
    const {
      id_clp_mentor: mentorsId,
      id: finalEvaluationsId,
    } = evaluationsFinal;

    const universities = await this._getUniversitiesUsersUseCase.execute({ usersId, batchId });
    const usersDetail = await this._usersDetailRepository.readById({ id: usersId });
    const mentors = await this._cLPGetMentorsDetailUseCase.execute({ id: mentorsId });
    const institutions = await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({ id: divisionInstitutionsId });
    const evaluationsBCF = await this._cLPGetEvaluationsFinalBCFUseCase.execute({ id: finalEvaluationsId });
    const evaluationsSS = await this._cLPGetEvaluationsFinalSSUseCase.execute({ id: finalEvaluationsId });
    const evaluationsHS = await this._cLPGetEvaluationsFinalHSUseCase.execute({ id: finalEvaluationsId });

    return {
      ...new CLPGetDetailEvaluationsFinal({
        ...usersDetail,
        ...evaluationsFinal,
      }),
      mentors,
      institutions,
      universities,
      evaluationsBCF,
      evaluationsSS,
      evaluationsHS,
    };
  }
}

module.exports = CLPGetEvaluationsFinalDetailUseCase;
