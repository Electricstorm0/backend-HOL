const routes = (handler) => ([
  {
    method: 'GET',
    path: '/evaluations',
    handler: handler.getEvaluationsHandler,
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
    path: '/evaluations/{id}',
    handler: handler.getEvaluationsByIdHandler,
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
