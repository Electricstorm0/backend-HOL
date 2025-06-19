const { options } = require('@hapi/hapi/lib/cors');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/events/users/{eventsHOLId}',
    handler: handler.postHolUsersEventsHandler,
    options: {
      auth: 'ils_jwt',
    },
  },
  // get total----------------------------------------
  {
    method: 'GET',
    path: '/events/type/{holEventsTypeId}/users/total',
    handler: handler.getTotalUsersEventsByEventsTypeHandler,
  },
  {
    method: 'GET',
    path: '/events/{eventsHOLId}/users/total-by-program',
    handler: handler.getTotalUsersEventsGroupByProgramHandler,
  },
  {
    method: 'GET',
    path: '/events/{eventsHOLId}/users/total',
    handler: handler.getTotalUsersEventsByEventsIdAndStatusHandler,
  },
  // ------------------------------------------------
  {
    method: 'GET',
    path: '/events/users',
    handler: handler.getHolUsersEventsHandler,
  },
  {
    method: 'GET',
    path: '/events/users/{id}',
    handler: handler.getHolUsersEventsByIdHandler,
  },
  {
    method: 'GET',
    path: '/events/{eventsHOLId}/users/status',
    handler: handler.getHolUsersEventsByEventsIdHandler,
  },
  {
    method: 'PUT',
    path: '/events/users/{eventsHOLId}/attende',
    handler: handler.putHolAttendeUsersEventsHandler,
    options: {
      auth: 'ils_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/events/{eventsHOLId}/users/{usersHOLId}/status',
    handler: handler.putHolStatusUsersEventsHandler,
  },
  {
    method: 'DELETE',
    path: '/events/users/{id}',
    handler: handler.deleteHolUsersEventsHandler,
  },
];

module.exports = routes;
