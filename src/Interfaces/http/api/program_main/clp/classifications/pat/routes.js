const routes = (handler) => ([
  {
    method: 'GET',
    path: '/classifications-pat',
    handler: handler.getClassificationsPATHandler,
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
