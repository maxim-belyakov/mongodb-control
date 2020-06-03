const noteRoutes = require('./note_routes');
const manuliatinaRoutes = require('./manuliatina_routes');

module.exports = function(app, db) {
  // noteRoutes(app, db.db(`notes`));
  manuliatinaRoutes(app, db.db(`manuliatina`));
};