const routes = (handler) => [
  {
    method: 'POST',
    path: '/iysf',
    handler: handler.postIYSFHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/iysf',
    handler: handler.getIYSFHandler,
  },
  {
    method: 'GET',
    path: '/iysf/{id}',
    handler: handler.getIYSFByIdHandler,
  },
  {
    method: 'PUT',
    path: '/iysf/{id}',
    handler: handler.putIYSFHandler,
  },
  {
    method: 'DELETE',
    path: '/iysf/{id}',
    handler: handler.deleteIYSFHandler,
  },
];

module.exports = routes;
