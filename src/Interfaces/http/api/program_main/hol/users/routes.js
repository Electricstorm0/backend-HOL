const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postHolUsersHandler,
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
    handler: handler.getUsersDetailByUsersIdHandler,
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
    path: '/users/me',
    handler: handler.getOwnUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/me/detail',
    handler: handler.getOwnUsersDetailHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
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
    path: '/users',
    handler: handler.putHolUsersHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
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
