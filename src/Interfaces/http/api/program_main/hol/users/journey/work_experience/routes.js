const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/work-experience',
    handler: handler.postHolUsersWorkExpHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/work-experience',
    handler: handler.getHolUsersWorkExpHandler,
  },
  {
    method: 'GET',
    path: '/users/work-experience/{id}',
    handler: handler.getHolUsersWorkExpByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/work-experience/{id}',
    handler: handler.putHolUsersWorkExpHandler,
  },
  {
    method: 'DELETE',
    path: '/users/work-experience/{id}',
    handler: handler.deleteHolUsersWorkExpHandler,
  },
];

module.exports = routes;
