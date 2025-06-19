const OfferedProgramHandler = require('./offered-program/handler');
const routes = require('./offered-program/routes');

module.exports = {
  name: 'program',
  register: async (server, { container }) => {
    const offeredProgramHandler = new OfferedProgramHandler(container);
    server.route(routes(offeredProgramHandler));
  },
};
