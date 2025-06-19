const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
  },
]);

module.exports = routes;
