const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/achievements',
    handler: handler.postHolUsersAchievementsHandler,
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
    path: '/users/achievements/{id}',
    handler: handler.getHolUsersAchievementsByUsersIdHandler,
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
    path: '/users/achievements',
    handler: handler.getOwnHolUsersAchievementsHandler,
    options: {
      auth: {
        access: {
          scope: [ '4'],
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/achievements/{id}',
    handler: handler.putHolUsersAchievementsHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/achievements/{id}',
    handler: handler.deleteHolUsersAchievementsHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
];

module.exports = routes;
