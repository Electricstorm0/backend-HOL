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
    path: '/activities',
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
