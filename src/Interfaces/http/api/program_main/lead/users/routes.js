const routes = (handler) => ([
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
  },
]);

module.exports = routes;
