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
    path: '/call-for-fellows', //http://localhost:3000/hol/call-for-fellows?holEventsTypeId=2&page=1&pageSize=5
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
