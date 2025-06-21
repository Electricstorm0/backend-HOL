const routes = (handler) => [
  {
    method: 'POST',
    path: '/article/me',
    handler: handler.postArticleHandler,
  },
  {
    method: 'GET',
    path: '/article',
    handler: handler.getAllArticleHandler,
  },
  {
    method: 'GET',
    path: '/article/users',
    handler: handler.getAllUsersArticleHandler,
  },
  {
    method: 'GET',
    path: '/article/me',
    handler: handler.getMyArticleHandler,
  },
  {
    method: 'GET',
    path: '/article/{id}/detail',
    handler: handler.getDetailArticleHandler,
  },
  {
    method: 'PUT',
    path: '/article/{id}',
    handler: handler.putArticleHandler,
  },
  {
    method: 'PUT',
    path: '/article/users/{id}/status',
    handler: handler.putStatusArticleHandler,
  },
  {
    method: 'DELETE',
    path: '/article/{id}',
    handler: handler.deleteArticleHandler,
  },
];
module.exports = routes;
