const routes = (handler) => ([
  {
    method: 'GET',
    path: '/evaluations-final/users',
    handler: handler.getEvaluationsFinalByUsersIdHandler,
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
