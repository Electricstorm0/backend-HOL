const routes = (handler) => [
  {
    method: 'POST',
    path: '/events/activities',
    handler: handler.postBAHandler,
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
    path: '/events/activities', //http://localhost:3000/hol/events/activities?holEventsTypeId=2&page=1&pageSize=5---
    handler: handler.getBAHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/events/activities/{id}',
    handler: handler.getBAByIdHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/events/activities/{id}',
    handler: handler.putBAHandler,
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
    path: '/events/activities/{id}',
    handler: handler.deleteBAHandler,
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
