const routes = (handler) => ([
  {
    method: 'GET',
    path: '/classifications-final/hard-skill',
    handler: handler.getClassificationsHSHandler,
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
    path: '/classifications-final/hard-skill/division-institutions/{id}',
    handler: handler.getClassificationsHSByDivisionInstitutionsHandler,
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
