const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/involvements',
    handler: handler.postHolUsersInvolvementsHandler,
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
    path: '/users/involvements',
    handler: handler.getOwnHolInvolvementsHandler,
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
    path: '/users/{id}/involvements',
    handler: handler.getHolInvolvementsByUsersIdHandler,
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
    path: '/users/{id}/involvements/detail',
    handler: handler.getDetailHolInvolvementsHandler,
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
    path: '/users/involvements/{id}',
    handler: handler.putHolUsersInvolvementsHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/involvements/{id}',
    handler: handler.deleteHolUsersInvolvementsHandler,
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
