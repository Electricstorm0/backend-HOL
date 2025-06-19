const UniversitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'universities',
  register: async (server, { container }) => {
    const universitiesHandlerHandler = new UniversitiesHandler(container);
    server.route(routes(universitiesHandlerHandler));
  },
};
