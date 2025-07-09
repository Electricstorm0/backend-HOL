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
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
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
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users/program/total',
    handler: handler.getTotalUsersHolByProgramHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
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
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
];

module.exports = routes;
