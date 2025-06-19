const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postHolUsersHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getHolUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getHolUsersByIdHandler,
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: handler.getOwnUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/me/detail',
    handler: handler.getOwnUsersDetailHandler,
  },
  {
    method: 'GET',
    path: '/users/total',
    handler: handler.getTotalUsersHolHandler,
  },
  {
    method: 'GET',
    path: '/users/program/total',
    handler: handler.getTotalUsersHolByProgramHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putHolUsersHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteHolUsersHandler,
  },
];

module.exports = routes;
