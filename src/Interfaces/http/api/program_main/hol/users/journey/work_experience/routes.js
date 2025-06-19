const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/experience',
    handler: handler.postHolUsersWorkExpHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/experience',
    handler: handler.getHolUsersWorkExpHandler,
  },
  {
    method: 'GET',
    path: '/users/experience/{id}',
    handler: handler.getHolUsersWorkExpByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/experience/{id}',
    handler: handler.putHolUsersWorkExpHandler,
  },
  {
    method: 'DELETE',
    path: '/users/experience/{id}',
    handler: handler.deleteHolUsersWorkExpHandler,
  },
];

module.exports = routes;
