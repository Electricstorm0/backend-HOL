const routes = (handler) => ([
  {
    method: 'GET',
    path: '/',
    handler: handler.getUniversitiesHandler,
    options: {
      auth: {
        access: {
          scope: ['admin', '+owner', 'mahasiswa'],
        },
      },
    },
  },
]);

module.exports = routes;
