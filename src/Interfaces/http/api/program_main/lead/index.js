const usersRoutes = require('./users/routes');
const UsersHandler = require('./users/handler');

module.exports = {
  name: 'lead',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(usersRoutes(usersHandler));
  },
};
