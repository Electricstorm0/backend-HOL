const routes = (handler) => [
  {
    method: 'POST',
    path: '/article/me',
    handler: handler.postArticleHandler,
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
    handler: handler.updateArticleHandler,
  },
  {
    method: 'DELETE',
    path: '/article/{id}',
    handler: handler.deleteArticleHandler,
  },
];
module.exports = routes;
