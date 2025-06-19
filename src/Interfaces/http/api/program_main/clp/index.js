const UsersHandler = require('./users/handler');
const usersRoutes = require('./users/routes');
const MentorsHandler = require('./mentors/handler');
const mentorsRoutes = require('./mentors/routes');
const EvaluationsHandler = require('./evaluations/handler');
const evaluationsRoutes = require('./evaluations/routes');
const EvaluationsFinalHandler = require('./evaluations/final/handler');
const evaluationsFinalRoutes = require('./evaluations/final/routes');
const EvaluationsPATHandler = require('./evaluations/pat/handler');
const evaluationsPATRoutes = require('./evaluations/pat/routes');
const InstitutionsHandler = require('./institutions/handler');
const institutionsRoutes = require('./institutions/routes');
const ClassificationsPATHandler = require('./classifications/pat/handler');
const classificationsPATRoutes = require('./classifications/pat/routes');
const ClassificationsHSHandler = require('./classifications/final/hard-skill/handler');
const classificationsHSRoutes = require('./classifications/final/hard-skill/routes');

module.exports = {
  name: 'clp',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(usersRoutes(usersHandler));

    const mentorsHandler = new MentorsHandler(container);
    server.route(mentorsRoutes(mentorsHandler));

    const evaluationsHandler = new EvaluationsHandler(container);
    server.route(evaluationsRoutes(evaluationsHandler));

    const evaluationsFinalHandler = new EvaluationsFinalHandler(container);
    server.route(evaluationsFinalRoutes(evaluationsFinalHandler));

    const evaluationsPATHandler = new EvaluationsPATHandler(container);
    server.route(evaluationsPATRoutes(evaluationsPATHandler));

    const institutionsHandler = new InstitutionsHandler(container);
    server.route(institutionsRoutes(institutionsHandler));

    const classificationsPATHandler = new ClassificationsPATHandler(container);
    server.route(classificationsPATRoutes(classificationsPATHandler));

    const classificationsHSHandler = new ClassificationsHSHandler(container);
    server.route(classificationsHSRoutes(classificationsHSHandler));
  },
};
