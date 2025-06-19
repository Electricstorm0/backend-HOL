const routes = (handler) => ([
  {
    method: 'GET',
    path: '/classifications-final/soft-skill',
    handler: handler.getClassificationsSSHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
]);

module.exports = routes;
