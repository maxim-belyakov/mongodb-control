const manuliatinaRoutes = require('./manuliatina_routes');

module.exports = function(app, db) {
  manuliatinaRoutes(app, db.db(`manuliatina`));
};