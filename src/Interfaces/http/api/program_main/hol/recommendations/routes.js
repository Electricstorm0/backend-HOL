const routes = (handler) => [
  {
    method: 'POST',
    path: '/recommendation',
    handler: handler.postRecommendationHandler,
  },
  {
    method: 'GET',
    path: '/recommendation/{id}',
    handler: handler.getRecommendationByIdHandler,
  },
  {
    method: 'GET',
    path: '/recommendation',
    handler: handler.getRecommendationByUserIdHandler,
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
];
module.exports = routes;
