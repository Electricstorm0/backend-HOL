const routes = (handler) => ([
  {
    method: 'GET',
    path: '/institutions',
    handler: handler.getInstitutionsHandler,
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
    path: '/institutions/{id}',
    handler: handler.getInstitutionsByIdHandler,
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
