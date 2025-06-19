const routes = (handler) => ([
  {
    method: 'GET',
    path: '/offered-program/users',
    handler: handler.getOfferedProgramByUsersHandler,
  },
]);

module.exports = routes;
