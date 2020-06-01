const noteRoutes = require('./note_routes');
const locationsRoutes = require('./locations_routes');

module.exports = function(app, db) {
  noteRoutes(app, db.db(`notes`));
  locationsRoutes(app, db.db(`manuliatina`));
  // Тут, позже, будут и другие обработчики маршрутов 
};