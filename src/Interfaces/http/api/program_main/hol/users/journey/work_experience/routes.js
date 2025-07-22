const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/work-experience',
    handler: handler.postHolUsersWorkExpHandler,
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
    path: '/users/work-experience',
    handler: handler.getOwnHolWorkExpHandler,
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
    path: '/users/work-experience/{id}',
    handler: handler.getHolWorkExpByUsersIdHandler,
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
    path: '/users/work-experience/{id}',
    handler: handler.putHolUsersWorkExpHandler,
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
    path: '/users/work-experience/{id}',
    handler: handler.deleteHolUsersWorkExpHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
  },
];

module.exports = routes;
