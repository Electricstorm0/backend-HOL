const routes = (handler) => [
  {
    method: 'POST',
    path: '/activities',
    handler: handler.postBAHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/activities', //http://localhost:3000/hol/activities?holEventsTypeId=2&page=1&pageSize=5---
    handler: handler.getBAHandler,
  },
  {
    method: 'GET',
    path: '/activities/{id}',
    handler: handler.getBAByIdHandler,
  },
  {
    method: 'PUT',
    path: '/activities/{id}',
    handler: handler.putBAHandler,
  },
  {
    method: 'DELETE',
    path: '/activities/{id}',
    handler: handler.deleteBAHandler,
  },
];

module.exports = routes;
