const routes = (handler) => [
  {
    method: 'POST',
    path: '/events/call-for-fellows',
    handler: handler.postCFFHandler,
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
    path: '/events/call-for-fellows', //http://localhost:3000/hol/events/call-for-fellows?holEventsTypeId=2&page=1&pageSize=5
    handler: handler.getCFFHandler,
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
    path: '/events/call-for-fellows/{id}',
    handler: handler.getCFFByIdHandler,
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
    path: '/events/call-for-fellows/{id}',
    handler: handler.putCFFHandler,
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
    path: '/events/call-for-fellows/{id}',
    handler: handler.deleteCFFHandler,
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
