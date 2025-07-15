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
    handler: handler.getHolUsersWorkExpHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users/work-experience/{id}',
    handler: handler.getHolUsersWorkExpByIdHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
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
