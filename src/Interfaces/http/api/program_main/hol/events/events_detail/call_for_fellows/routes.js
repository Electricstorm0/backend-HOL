const routes = (handler) => [
  {
    method: 'POST',
    path: '/call_for_fellows',
    handler: handler.postCFFHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/call_for_fellows',
    handler: handler.getCFFHandler,
  },
  {
    method: 'GET',
    path: '/call_for_fellows/{id}',
    handler: handler.getCFFByIdHandler,
  },
  {
    method: 'PUT',
    path: '/call_for_fellows/{id}',
    handler: handler.putCFFHandler,
  },
  {
    method: 'DELETE',
    path: '/call_for_fellows/{id}',
    handler: handler.deleteCFFHandler,
  },
];

module.exports = routes;
