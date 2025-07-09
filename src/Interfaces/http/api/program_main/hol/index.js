// cff
const cffRoutes = require('./temp-Events/EventsDetail/CallForFellows/routes');
const cffHandler = require('./temp-Events/EventsDetail/CallForFellows/handler');
// ba
const baRoutes = require('./temp-Events/EventsDetail/BondingActivities/routes');
const baHandler = require('./temp-Events/EventsDetail/BondingActivities/handler');
// iysf
const iysfRoutes = require('./temp-Events/EventsDetail/IYSF/routes');
const iysfHandler = require('./temp-Events/EventsDetail/IYSF/handler');
// users events
const HolUsersEventsHandler = require('./temp-Events/Users/handler');
const HolUsersEventsRoutes = require('./temp-Events/Users/routes');
// users hol
const HolUsersHandler = require('./Users/handler');
const HolUsersRoutes = require('./Users/routes');
// achievements
const HolUsersAchieveRoutes = require('./Users/Journey/Achievements/routes');
const HolUsersAchieveHandler = require('./Users/Journey/Achievements/handler');
// work experience
const HolUsersExpRoutes = require('./Users/Journey/WorkExperience/routes');
const HolUsersExpHandler = require('./Users/Journey/WorkExperience/handler');
// involvements
const HolUsersInvolveRoutes = require('./Users/Journey/Involvements/routes');
const HolUsersInvolveHandler = require('./Users/Journey/Involvements/handler');
// recommendations
const HOLRecommendationRoutes = require('./Recommendations/routes');
const HOLRecommendationsHandler = require('./Recommendations/handler');
// article
const HOLArticleRoutes = require('./Articles/routes');
const HOLArticleHandler = require('./Articles/handler');

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
