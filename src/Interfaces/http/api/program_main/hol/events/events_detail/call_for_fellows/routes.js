const routes = (handler) => [
  {
    method: 'POST',
    path: '/call-for-fellows',
    handler: handler.postCFFHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/call-for-fellows',
    handler: handler.getCFFHandler,
  },
  {
    method: 'GET',
    path: '/call-for-fellows/{id}',
    handler: handler.getCFFByIdHandler,
  },
  {
    method: 'PUT',
    path: '/call-for-fellows/{id}',
    handler: handler.putCFFHandler,
  },
  {
    method: 'DELETE',
    path: '/call-for-fellows/{id}',
    handler: handler.deleteCFFHandler,
  },
];

module.exports = routes;
