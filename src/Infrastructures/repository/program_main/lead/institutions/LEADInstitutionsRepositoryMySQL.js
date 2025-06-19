const LEADInstitutionsRepository = require('../../../../../Domains/program_main/lead/institutions/LEADInstitutionsRepository');

class LEADInstitutionsRepositoryMySQL
  extends
  LEADInstitutionsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({
    name, location, email, tglBerdiri, gambaranProfilInstansi, urlCompanyProfile, urlProposalCompany, provinciesId, leadInstitutionsTypeId,
  }) {
    const query = {
      text: 'INSERT INTO `tx_lead_institutions` (name,location,email,tgl_berdiri,gambaran_profil_instansi,url_company_profile,url_proposal_company,id_provincies,id_lead_institutions_type) VALUES (?,?,?,?,?,?,?,?)',
      values: [name, location, email, tglBerdiri, gambaranProfilInstansi, urlCompanyProfile, urlProposalCompany, provinciesId, leadInstitutionsTypeId],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return {
      id: result.insertId,
    };
  }

  async read() {
    const query = {
      text: 'SELECT * FROM `tx_lead_institutions`',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_lead_institutions` WHERE id = ?',
      values: [id],
    };

    const [result] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_lead_institutions` SET ? WHERE id=?',
      values: [id, payload],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }

  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_lead_institutions` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LEADInstitutionsRepositoryMySQL;
