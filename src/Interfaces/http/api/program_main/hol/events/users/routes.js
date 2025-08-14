const routes = (handler) => [
  {
    method: 'POST',
    path: '/events/{eventsHOLId}/users',
    handler: handler.postHolUsersEventsHandler,
    options: {
      auth: {
        access: {
          scope: ['3', '4'],
        },
      },
    },
  },
  // get total----------------------------------------
  {
    method: 'GET',
    path: '/events/type/{holEventsTypeId}/users/total',
    handler: handler.getTotalUsersEventsByEventsTypeHandler,
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
    path: '/events/{eventsHOLId}/users/total-by-program',
    handler: handler.getTotalUsersEventsGroupByProgramHandler,
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
    path: '/events/{eventsHOLId}/users/total',
    handler: handler.getTotalUsersEventsByEventsIdAndStatusHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  // ------------------------------------------------

  {
    method: 'GET',
    path: '/events/users/me/activity',
    handler: handler.getHolUsersEventsByUsersIdHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/events/users/me/activity/status',
    handler: handler.getHolUsersEventsStatusByUsersIdHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/events/{eventsHOLId}/users',
    handler: handler.getHolUsersEventsByEventsIdHandler,
    options: {
      auth: {
        access: {
          scope: ['3'],
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/events/{eventsHOLId}/users/attende',
    handler: handler.putHolAttendeUsersEventsHandler,
    options: {
      auth: {
        access: {
          scope: ['4'],
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/events/{eventsHOLId}/users/{usersHOLId}/status',
    handler: handler.putHolStatusUsersEventsHandler,
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
    path: '/events/users/{id}',
    handler: handler.deleteHolUsersEventsHandler,
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
