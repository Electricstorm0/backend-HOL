const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/achievements',
    handler: handler.postHolUsersAchievementsHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/achievements',
    handler: handler.getHolUsersAchievementsHandler,
  },
  {
    method: 'GET',
    path: '/users/achievements/{id}',
    handler: handler.getHolUsersAchievementsByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/achievements/{id}',
    handler: handler.putHolUsersAchievementsHandler,
  },
  {
    method: 'DELETE',
    path: '/users/achievements/{id}',
    handler: handler.deleteHolUsersAchievementsHandler,
  },
];

module.exports = routes;
