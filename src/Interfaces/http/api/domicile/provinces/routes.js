const routes = (handler) => ([
  {
    method: 'POST',
    path: '/provincies',
    handler: handler.postProvinceHandler,
  },
  {
    method: 'GET',
    path: '/provincies',
    handler: handler.getProvinciesHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/provincies/{id}',
    handler: handler.getProvinceHandler,
  },
  {
    method: 'PUT',
    path: '/provincies/{id}',
    handler: handler.putProvinceHandler,
  },
  {
    method: 'DELETE',
    path: '/provincies/{id}',
    handler: handler.deleteProvinceHandler,
  },
]);

module.exports = routes;
