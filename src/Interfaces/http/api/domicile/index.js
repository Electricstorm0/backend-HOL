const ProvinciesHandler = require('./provinces/handler');
const provinciesRoutes = require('./provinces/routes');

const RegenciesHandler = require('./regencies/handler');
const regenciesRoutes = require('./regencies/routes');

module.exports = {
  name: 'domicile',
  register: async (server, { container }) => {
    const provinciesHandler = new ProvinciesHandler(container);
    server.route(provinciesRoutes(provinciesHandler));

    const regenciesHandler = new RegenciesHandler(container);
    server.route(regenciesRoutes(regenciesHandler));
  },
};
