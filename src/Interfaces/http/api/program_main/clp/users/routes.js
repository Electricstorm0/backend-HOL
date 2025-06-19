const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUsersHandler,
  },
  {
    method: 'PUT',
    path: '/users',
    handler: handler.putUsersHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUsersHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUsersByIdHandler,
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: handler.getOwnUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/me/detail',
    handler: handler.getOwnUsersDetailHandler,
  },
]);

module.exports = routes;
