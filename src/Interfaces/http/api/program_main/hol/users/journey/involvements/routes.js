const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/involvements',
    handler: handler.postHolUsersInvolvementsHandler,
    options: {
      auth: false,
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
  },
  {
    method: 'DELETE',
    path: '/users/involvements/{id}',
    handler: handler.deleteHolUsersInvolvementsHandler,
  },
];

module.exports = routes;
