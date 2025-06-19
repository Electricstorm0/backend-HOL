const InvariantError = require('../../../../../Commons/exceptions/InvariantError');
const CLPUsersRepository = require('../../../../../Domains/program_main/clp/users/CLPUsersRepository');

class CLPUsersRepositoryMySQL extends CLPUsersRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    batchId, usersId, kegId, semester, applied, curriculumVitae, academicTranscript, organizationCertificateOne, organizationCertificateTwo, organizationCertificateThree, organizationCertificateFour, organizationCertificateFive, mobKebPengajuanKeberangkatan, mobKebProvinsiKeberangkatan, mobKebModaKeberangkatan, mobKebProvinsiAsalKeberangkatan, mobKebBandaraStasiunKeberangkatan, mobKebProvBandaraStasiunKeberangkatan, mobKebBandaraStasiunTujuan, mobKebProvBandaraStasiunTujuan, mobKepPengajuanKepulangan, mobKepProvinsiKepulangan, mobKepModaKepulangan, mobKepProvinsiAsalKeberangkatan, mobKepBandaraStasiunKepulangan, mobKepProvBandaraStasiunKepulangan, mobKepBandaraStasiunTujuan, mobKepProvBandaraStasiunTujuan, mobUrlSuratKeterangan, musicalInstrument, ability, descriptionAbility, bcfActivities, otherActivities, fiveYearAward, fiveYearPlan, fiveYearPlanDescription, selfieCardId, regenciesId, leadDivisionInstitutionsId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_clp_users` (id_batch,id_users,id_keg,semester,applied,curriculum_vitae,academic_transcript,organization_certificate_one,organization_certificate_two,organization_certificate_three,organization_certificate_four,organization_certificate_five,mob_keb_pengajuan_keberangkatan,mob_keb_provinsi_keberangkatan,mob_keb_moda_keberangkatan,mob_keb_provinsi_asal_keberangkatan,mob_keb_bandara_stasiun_keberangkatan,mob_keb_prov_bandara_stasiun_keberangkatan,mob_keb_bandara_stasiun_tujuan,mob_keb_prov_bandara_stasiun_tujuan,mob_kep_pengajuan_kepulangan,mob_kep_provinsi_kepulangan,mob_kep_moda_kepulangan,mob_kep_provinsi_asal_keberangkatan,mob_kep_bandara_stasiun_kepulangan,mob_kep_prov_bandara_stasiun_kepulangan,mob_kep_bandara_stasiun_tujuan,mob_kep_prov_bandara_stasiun_tujuan,mob_url_surat_keterangan,musical_instrument,ability,description_ability,bcf_activities,other_activities,five_year_award,five_year_plan,five_year_plan_description,id_card_selfie,id_regencies,id_lead_division_institutions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      values: [
        batchId, usersId, kegId, semester, applied, curriculumVitae, academicTranscript, organizationCertificateOne, organizationCertificateTwo, organizationCertificateThree, organizationCertificateFour, organizationCertificateFive, mobKebPengajuanKeberangkatan, mobKebProvinsiKeberangkatan, mobKebModaKeberangkatan, mobKebProvinsiAsalKeberangkatan, mobKebBandaraStasiunKeberangkatan, mobKebProvBandaraStasiunKeberangkatan, mobKebBandaraStasiunTujuan, mobKebProvBandaraStasiunTujuan, mobKepPengajuanKepulangan, mobKepProvinsiKepulangan, mobKepModaKepulangan, mobKepProvinsiAsalKeberangkatan, mobKepBandaraStasiunKepulangan, mobKepProvBandaraStasiunKepulangan, mobKepBandaraStasiunTujuan, mobKepProvBandaraStasiunTujuan, mobUrlSuratKeterangan, musicalInstrument, ability, descriptionAbility, bcfActivities, otherActivities, fiveYearAward, fiveYearPlan, fiveYearPlanDescription, selfieCardId, regenciesId, leadDivisionInstitutionsId,
      ],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async update({ payload, id }) {
    const query = {
      text: 'UPDATE `tx_clp_users` SET ? WHERE id = ?',
      values: [payload, id],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async readCountUsers({ batchId }) {
    const query = {
      text: 'SELECT COUNT(*) as numRows FROM `tx_clp_users` WHERE id_batch = ?',
      values: [batchId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0].numRows;
  }

  async read({ skip, numPerPage, batchId }) {
    const query = {
      text: `SELECT TCU.id, TCU.id_users, TCU.id_lead_division_institutions, TCEF.id_clp_mentor, TUD.first_name, TUD.last_name 
      FROM tx_clp_users AS TCU 
      INNER JOIN tx_users_detail AS TUD ON TCU.id_users = TUD.id
      INNER JOIN tx_clp_evaluations_final AS TCEF ON TCU.id = TCEF.id
      WHERE TCU.id_batch = ? ORDER BY TCU.id ASC LIMIT ?, ?`,
      values: [batchId, skip, numPerPage],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_users` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readByUsersId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_users` WHERE id_users = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async readyByBatchAndUsersId({ batchId, usersId }) {
    const query = {
      text: 'SELECT id, id_lead_division_institutions FROM `tx_clp_users` WHERE id_batch = ? AND id_users = ?',
      values: [batchId, usersId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new InvariantError('Users not found!');
    }

    return result[0];
  }

  async readByDivisionInstitutionsId({ divisionInstitutionsId, id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_users` WHERE id_lead_division_institutions = ? AND id != ?',
      values: [divisionInstitutionsId, id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readAllByDivisionInstitutionsId({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_clp_users` WHERE id_lead_division_institutions = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async readCountByDivisionInstitutionsId({ divisionInstitutionsId, usersId }) {
    const query = {
      text: 'SELECT COUNT(*) AS totalUsersDivision FROM `tx_clp_users` WHERE id_lead_division_institutions = ? AND id_users != ?',
      values: [divisionInstitutionsId, usersId],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_clp_users` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = CLPUsersRepositoryMySQL;
