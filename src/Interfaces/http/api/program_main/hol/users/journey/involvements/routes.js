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
    handler: handler.getHolUsersInvolvementsHandler,
  },
  {
    method: 'GET',
    path: '/users/involvements/{id}',
    handler: handler.getHolUsersInvolvementsByIdHandler,
  },
  {
    method: 'GET',
    path: '/users/{usersHOLId}/involvements/detail',
    handler: handler.getHolDetailInvolvementsHandler,
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
