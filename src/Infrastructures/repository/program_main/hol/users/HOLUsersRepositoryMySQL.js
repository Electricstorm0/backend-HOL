const HOLUsersRepository = require('../../../../../Domains/program_main/hol/users/HOLUsersRepository');
const InvariantError = require('../../../../../Commons/exceptions/InvariantError');

class HOLUsersRepositoryMySQL extends HOLUsersRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountUsers() {
    const query = {
      text: 'SELECT COUNT(*) AS totalAlumni FROM `tx_hol_users`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readCountUsersByProgram() {
    const query = {
      text: `SELECT msp.name, COUNT(hu.id_users) AS totalAlumni
      FROM 
        master_second_tier_program AS msp
      LEFT JOIN 
        master_third_tier_program AS mtp 
        ON mtp.id_second_tier_program = msp.id
      LEFT JOIN 
        tx_offered_program AS op 
        ON op.id_third_tier_program = mtp.id
      LEFT JOIN 
        tx_hol_users AS hu 
        ON hu.id_users = op.id_users
      GROUP BY 
        msp.name;
      `,
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async create({
    usersId,
    batchId,
    musicalInstrument,
    talent,
    taletDescriptionSelected,
    bcfActivities,
    otherActivities,
    fiveYearAward,
    fiveYearPlan,
    fiveYearPlanDescription,
    ability,
    abilityDescriptionSelected,
    abilityAwardSelected,
    achievementsLastThreeYears,
    activitiesOutside,
    haveABussiness,
    joinedSocialCommunities,
  }) {
    const query = {
      text: `INSERT INTO tx_hol_users (id_users,id_batch, musical_instrument,talent,talent_description_selected,bcf_activites,
      other_activites,five_year_award,five_year_plan,five_year_plan_description,ability,ability_description_selected,
      ability_award_selected,achievement_last_three_years,activities_outside_college_and_internship,have_a_business,
      joined_social_communities) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      values: [
        usersId,
        batchId,
        musicalInstrument,
        talent,
        taletDescriptionSelected,
        bcfActivities,
        otherActivities,
        fiveYearAward,
        fiveYearPlan,
        fiveYearPlanDescription,
        ability,
        abilityDescriptionSelected,
        abilityAwardSelected,
        achievementsLastThreeYears,
        activitiesOutside,
        haveABussiness,
        joinedSocialCommunities,
      ],
    };

    const [result] = await this._pool.query(query.text, query.values);

    return result;
  }
  async checkRegisteredUsersHOL({ usersId, batchId }) {
    const query = {
      text: 'SELECT 1 FROM `tx_hol_users` WHERE id_users=? AND id_batch=? LIMIT 1',
      values: [usersId, batchId],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result.length > 0;
  }

  async readByUsersId({ usersId }) {
    const query = {
      text: `SELECT id , id_batch as batchId 
            FROM tx_hol_users 
            WHERE 
            id_users = ? 
            ORDER BY id_batch DESC LIMIT 1`,
      values: [usersId],
    };
    const [result] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new InvariantError('Users not found!');
    }

    return result[0];
  }

  async readJourneyUsers() {
    const query = {
      text: `SELECT id_users_hol, created_at, "achievements" as recent_journey 
      FROM tx_hol_achievements
       UNION ALL 
       SELECT id_users_hol, created_at, "involvements" as recent_journey FROM tx_hol_involvements 
      ORDER BY created_at DESC`,
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async read({ skip, numPerPage }) {
    const query = {
      text: `SELECT hu.id, hu.id_users, concat(ud.first_name, " ",ud.last_name) as Alumni_Name, stp.name as program, b.batch ,
       mdp.name as domisili 
       FROM tx_hol_users as hu 
       JOIN tx_users_detail as ud on ud.id = hu.id_users 
       JOIN tx_offered_program as op on op.id_users = hu.id_users 
       JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program 
       JOIN master_second_tier_program as stp on stp.id = mtp.id_second_tier_program 
       JOIN master_batch as b on b.id = op.id_batch 
       JOIN tx_users_domicile as udom on udom.id_users = hu.id_users 
       JOIN master_domicile_provincies as mdp on mdp.id = udom.id_provincies`,
      values: [skip, numPerPage],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: `SELECT hu.*, b.batch, YEAR(b.date_start) AS batchYear,
       mdr.id AS id_regencies,
       ldi.id AS id_lead_division_institutions
        FROM tx_hol_users hu
        JOIN master_batch b ON b.id = hu.id_batch
        JOIN tx_users_domicile udom ON udom.id_users = hu.id_users
        left JOIN master_domicile_regencies mdr ON mdr.id = udom.id_regencies
        left JOIN tx_clp_users cu ON cu.id_users = hu.id_users AND cu.id_batch = hu.id_batch
        left JOIN tx_lead_division_institutions ldi ON ldi.id = cu.id_lead_division_institutions
        WHERE hu.id_users = ?
        ORDER BY hu.id_batch DESC
        LIMIT 1`,
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users` SET ? WHERE id = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users` WHERE id = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersRepositoryMySQL;
