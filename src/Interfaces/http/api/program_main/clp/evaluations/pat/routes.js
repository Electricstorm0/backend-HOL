const routes = (handler) => ([
  {
    method: 'GET',
    path: '/evaluations-pat/evaluated/users',
    handler: handler.getEvaluationsPATHasEvaluatedByUsersIdHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/evaluations-pat/evaluated/users/{id}',
    handler: handler.postEvaluationsPATByUsersIdHandler,
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
