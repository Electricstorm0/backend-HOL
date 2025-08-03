const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'REGISTER_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat comment baru karena tipe data tidak sesuai'),

  // call for fellows
  'GET_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat mengambil data events karena tipe data tidak sesuai'),
  'GET_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat mengambil data events karena data yang dibutuhkan tidak ada'),
  'GET_USERS_EVENTS.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat mengambil data users karena tipe data tidak sesuai'),
  'GET_USERS_EVENTS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat mengambil data users karena data yang dibutuhkan tidak ada'),
  'VERIFY_DATA.NOT_CONTAIN_BATCH_DATA': new InvariantError('Data tidak ditemukan'),

  'GET_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat mengambil data karena tipe data tidak sesuai'),
  'GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat mengambil data karena data yang dibutuhkan tidak ada'),
  'UPDATE_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat memperbarui data karena tipe data tidak sesuai'),
  'UPDATE_DATA.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat memperbarui data karena data yang dibutuhkan tidak ada'),
  'HOL_ADD_USERS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat menambah users baru karena data yang dibutuhkan tidak ada'),
  'HOL_ADD_USERS.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Tidak dapat menambah users baru karena tipe data tidak sesuai'),
};

module.exports = DomainErrorTranslator;
