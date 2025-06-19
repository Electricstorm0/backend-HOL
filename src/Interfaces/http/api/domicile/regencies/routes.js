const routes = (handler) => ([
  {
    method: 'POST',
    path: '/regencies',
    handler: handler.postRegencieHandler,
  },
  {
    method: 'GET',
    path: '/regenciess',
    handler: handler.getRegenciesHandler,
  },
  {
    method: 'GET',
    path: '/regencies/{id}',
    handler: handler.getRegencieHandler,
  },
  {
    method: 'GET',
    path: '/regencies/provincies/{id}',
    handler: handler.getRegenciesByPronviciesHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/regencies/{id}',
    handler: handler.putRegencieHandler,
  },
  {
    method: 'DELETE',
    path: '/regencies/{id}',
    handler: handler.deleteRegencieHandler,
  },
]);

module.exports = routes;
