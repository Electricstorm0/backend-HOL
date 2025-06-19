const CLPGetMentors = require('../../../../../Domains/program_main/clp/mentors/entities/CLPGetMentors');

class CLPGetMentorsByIdUseCase {
  constructor({
    cLPUsersRepository, cLPMentorsRepository, usersDetailRepository,
    cLPMentorsDivisionInstitutionsRepository,
    lEADGetInstitutionsByDivisionInstitutionsUseCase,
    cLPGetUsersByDivisionInstitutionsUseCase,
  }) {
    this._cLPUsersRepository = cLPUsersRepository;
    this._cLPMentorsRepository = cLPMentorsRepository;
    this._usersDetailRepository = usersDetailRepository;
    this._cLPMentorsDivisionInstitutionsRepository = cLPMentorsDivisionInstitutionsRepository;
    this._lEADGetInstitutionsByDivisionInstitutionsUseCase = lEADGetInstitutionsByDivisionInstitutionsUseCase;
    this._cLPGetUsersByDivisionInstitutionsUseCase = cLPGetUsersByDivisionInstitutionsUseCase;
  }

  async execute({ id }) {
    const mentors = await this._cLPMentorsRepository.readById({ id });
    const data = {
      ...new CLPGetMentors({
        ...mentors,
        mentorsId: mentors.id,
        ...await this._usersDetailRepository.readById({ id: mentors.id_users }),
      }),
    };

    const mentorsDivisionInstitutions = await this._cLPMentorsDivisionInstitutionsRepository.readByMentorsId({ id: mentors.id });// AMBIL LEMBAGA BY MENTOR ASSIGN
    const mentoring = await Promise.all(mentorsDivisionInstitutions.map(async (value) => ({
      ...await this._lEADGetInstitutionsByDivisionInstitutionsUseCase.execute({
        id: value.id_lead_division_institutions,
      }),
      mentess: await this._cLPGetUsersByDivisionInstitutionsUseCase.execute({
        id: value.id_lead_division_institutions,
      }),
    })));

    return {
      ...data,
      mentoring,
    };
  }
}

module.exports = CLPGetMentorsByIdUseCase;
