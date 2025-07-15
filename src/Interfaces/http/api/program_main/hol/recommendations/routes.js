const routes = (handler) => [
  {
    method: 'POST',
    path: '/recommendation',
    handler: handler.postRecommendationHandler,
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
    path: '/recommendation/users',
    handler: handler.getAllUsersRecommendationHandler,
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
    path: '/recommendation/users/status', // http://localhost:3000/hol/recommendation/users?recommendationStatusId=1&page=1&pageSize=5
    handler: handler.getAllUsersRecommendationByStatusHandler,
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
    path: '/recommendation/{id}',
    handler: handler.getRecommendationByIdHandler,
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
    path: '/recommendation',
    handler: handler.getRecommendationByUserIdHandler,
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
    path: '/recommendation/{recommendationHolId}',
    handler: handler.putRecommendationStatusHandler,
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
    path: '/recommendation/users/total',
    handler: handler.getTotalUsersRecommendationHandler,
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
    path: '/recommendation/users/total/status/{recommendationStatusId}',
    handler: handler.getTotalUsersRecommendationByStatusHandler,
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
