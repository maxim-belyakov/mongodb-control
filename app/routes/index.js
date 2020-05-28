const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db.db(`notes`));
  // Тут, позже, будут и другие обработчики маршрутов 
};