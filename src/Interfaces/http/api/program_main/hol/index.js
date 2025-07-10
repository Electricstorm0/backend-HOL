// cff
const cffRoutes = require('./Events/EventsDetail/CallForFellows/routes');
const cffHandler = require('./Events/EventsDetail/CallForFellows/handler');
// ba
const baRoutes = require('./Events/EventsDetail/BondingActivities/routes');
const baHandler = require('./Events/EventsDetail/BondingActivities/handler');
// iysf
const iysfRoutes = require('./Events/EventsDetail/IYSF/routes');
const iysfHandler = require('./Events/EventsDetail/IYSF/handler');
// users events
const HolUsersEventsHandler = require('./Events/Users/handler');
const HolUsersEventsRoutes = require('./Events/Users/routes');
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
const HOLRecommendationRoutes = require('./temp-Recommendations/routes');
const HOLRecommendationsHandler = require('./temp-Recommendations/handler');
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
