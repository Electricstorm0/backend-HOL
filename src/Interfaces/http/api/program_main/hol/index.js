// cff
const cffRoutes = require('./events/events_detail/call_for_fellows/routes');
const cffHandler = require('./events/events_detail/call_for_fellows/handler');
// ba
const baRoutes = require('./events/events_detail/bonding_activities/routes');
const baHandler = require('./events/events_detail/bonding_activities/handler');
// iysf
const iysfRoutes = require('./events/events_detail/iysf/routes');
const iysfHandler = require('./events/events_detail/iysf/handler');
// users events
const HolUsersEventsHandler = require('./events/temp-UsersEvents/handler');
const HolUsersEventsRoutes = require('./events/temp-UsersEvents/routes');
// users hol
const HolUsersHandler = require('./users/handler');
const HolUsersRoutes = require('./users/routes');
// achievements
const HolUsersAchieveRoutes = require('./users/journey/achievements/routes');
const HolUsersAchieveHandler = require('./users/journey/achievements/handler');
// work experience
const HolUsersExpRoutes = require('./users/journey/work_experience/routes');
const HolUsersExpHandler = require('./users/journey/work_experience/handler');
// involvements
const HolUsersInvolveRoutes = require('./users/journey/involvements/routes');
const HolUsersInvolveHandler = require('./users/journey/involvements/handler');
// recommendations
const HOLRecommendationRoutes = require('./recommendations/routes');
const HOLRecommendationsHandler = require('./recommendations/handler');
// article
const HOLArticleRoutes = require('./articles/routes');
const HOLArticleHandler = require('./articles/handler');

module.exports = {
  name: 'hol',
  register: async (server, { container }) => {
    // CFF
    const eventCFFHandler = new cffHandler(container);
    server.route(cffRoutes(eventCFFHandler));
    // BA
    const eventBAHandler = new baHandler(container);
    server.route(baRoutes(eventBAHandler));
    // IYSF
    const eventIYSFHandler = new iysfHandler(container);
    server.route(iysfRoutes(eventIYSFHandler));
    // users events
    const UsersEventsHandler = new HolUsersEventsHandler(container);
    server.route(HolUsersEventsRoutes(UsersEventsHandler));
    //users Hol
    const UsersHandler = new HolUsersHandler(container);
    server.route(HolUsersRoutes(UsersHandler));
    // users achievements
    const UsersAchieveHandler = new HolUsersAchieveHandler(container);
    server.route(HolUsersAchieveRoutes(UsersAchieveHandler));
    // Users Work Exp
    const UsersExpHandler = new HolUsersExpHandler(container);
    server.route(HolUsersExpRoutes(UsersExpHandler));
    // Users Involve
    const UsersInvolveHandler = new HolUsersInvolveHandler(container);
    server.route(HolUsersInvolveRoutes(UsersInvolveHandler));
    // Recommendations
    const recommendations = new HOLRecommendationsHandler(container);
    server.route(HOLRecommendationRoutes(recommendations));
    // articlle
    const article = new HOLArticleHandler(container);
    server.route(HOLArticleRoutes(article));
  },
};
