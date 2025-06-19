const MasterUniversitiesMajorRepository = require('../../../Domains/universities/MasterUniversitiesMajorRepository');

class MasterUniversitiesMajorRepositoryMySQL extends MasterUniversitiesMajorRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ name }) {
    const query = {
      text: 'INSERT INTO `master_universities_major` (name) VALUES (?)',
      values: [name],
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
      text: 'SELECT * FROM `master_universities_major`',
    };
    const [result] = await this._pool.query(
      query.text,
    );
    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM master_universities_major WHERE id = ?',
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
      text: 'UPDATE `master_universities_major` SET ? WHERE id=?',
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
      text: 'DELETE FROM `master_universities_major` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = MasterUniversitiesMajorRepositoryMySQL;
