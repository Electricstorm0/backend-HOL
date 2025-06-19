const routes = (handler) => ([
  {
    method: 'GET',
    path: '/mentors',
    handler: handler.getMentorsHandler,
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
    path: '/mentors/{id}',
    handler: handler.getMentorsByIdHandler,
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
