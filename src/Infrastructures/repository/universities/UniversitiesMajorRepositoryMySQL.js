const UniversitiesMajorRepository = require('../../../Domains/universities/UniversitiesMajorRepository');

class UniversitiesMajorRepositoryMySQL
  extends UniversitiesMajorRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async create({ universitiesId, majorId }) {
    const query = {
      text: 'INSERT INTO `tx_universities_major` (id_universities,id_major) VALUES (?,?) ',
      values: [universitiesId, majorId],
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
      text: 'SELECT * FROM `tx_universities_major` ',
    };

    const [result] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async readById({ id }) {
    const query = {
      text: 'SELECT * FROM tx_universities_major WHERE id = ?',
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
      text: 'UPDATE `tx_universities_major` SET ? WHERE id=?',
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
      text: 'DELETE FROM `tx_universities_major` WHERE id=?',
      values: [id],
    };
    const [result] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = UniversitiesMajorRepositoryMySQL;
