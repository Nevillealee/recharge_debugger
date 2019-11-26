const orderRoutes = require('./order_routes');
const subscriptionRoutes = require('./subscription_routes');

module.exports = function(app, db) {
  // multiple route groups can go here
  orderRoutes(app, db);
  subscriptionRoutes(app, db);
}
