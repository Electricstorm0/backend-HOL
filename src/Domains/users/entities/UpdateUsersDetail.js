/* eslint-disable camelcase */
class UpdateUsersDetail {
  constructor(payload) {
    const {
      id_card_number, first_name, last_name, sex, phone_number, birth_date,
      emergency_phone_number, relationship_emergency_phone_number,
      socmed_instagram, socmed_tiktok, socmed_linkedin,
      bank_account_number, bank_account_name, bank_name,
    } = payload;

    this.id_card_number = id_card_number;
    this.first_name = first_name;
    this.last_name = last_name;
    this.sex = sex;
    this.phone_number = phone_number;
    this.birth_date = birth_date;
    this.emergency_phone_number = emergency_phone_number;
    this.relationship_emergency_phone_number = relationship_emergency_phone_number;
    this.socmed_instagram = socmed_instagram;
    this.socmed_tiktok = socmed_tiktok;
    this.socmed_linkedin = socmed_linkedin;
    this.bank_account_number = bank_account_number;
    this.bank_account_name = bank_account_name;
    this.bank_name = bank_name;
  }
}

module.exports = UpdateUsersDetail;
