const routes = (handler) => [
  {
    method: 'POST',
    path: '/events/iysf',
    handler: handler.postIYSFHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/events/iysf', //http://localhost:3000/hol/events/iysf?holEventsTypeId=2&page=1&pageSize=5
    handler: handler.getIYSFHandler,
  },
  {
    method: 'GET',
    path: '/events/iysf/{id}',
    handler: handler.getIYSFByIdHandler,
  },
  {
    method: 'PUT',
    path: '/events/iysf/{id}',
    handler: handler.putIYSFHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/events/iysf/{id}',
    handler: handler.deleteIYSFHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
];

module.exports = routes;
