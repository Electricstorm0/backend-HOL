const HOLUsersRepository = require('../../../../../Domains/program_main/hol/users/HOLUsersRepository');
const InvariantError = require('../../../../../Commons/exceptions/InvariantError');

class HOLUsersRepositoryMySQL extends HOLUsersRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async readCountUsers() {
    const query = {
      text: 'SELECT COUNT(*) AS Total_alumni FROM `tx_hol_users`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async readCountUsersByProgram() {
    const query = {
      text: 'SELECT  msp.name,COUNT(*) as total_alumni FROM tx_hol_users as hu JOIN tx_offered_program as op on op.id_users = hu.id_users JOIN master_third_tier_program as mtp on mtp.id = op.id_third_tier_program JOIN master_second_tier_program as msp on msp.id = mtp.id_second_tier_program GROUP BY msp.name ',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }

  async create({
    usersId,
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
      text: 'INSERT INTO `tx_hol_users` (id_users, musical_instrument,talent,talent_description_selected,bcf_activites,other_activites,five_year_award,five_year_plan,five_year_plan_description,ability,ability_description_selected,ability_award_selected,achievement_last_three_years,activities_outside_college_and_internship,have_a_business,joined_social_communities) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      values: [
        usersId,
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
  async read() {
    const query = {
      text: 'SELECT * FROM `tx_hol_users`',
    };
    const [result] = await this._pool.query(query.text);
    return result;
  }
  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM `tx_hol_users` WHERE id_users=?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result[0];
  }

  async update({ id, payload }) {
    const query = {
      text: 'UPDATE `tx_hol_users` SET ? WHERE id_users = ?',
      values: [payload, id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
  async delete({ id }) {
    const query = {
      text: 'DELETE FROM `tx_hol_users` WHERE id_users = ?',
      values: [id],
    };
    const [result] = await this._pool.query(query.text, query.values);
    return result;
  }
}

module.exports = HOLUsersRepositoryMySQL;
