var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/locations', async (req, res) => {
    const getLocations = (param) => {
      return new Promise((resolve, reject) => {
          db.collection("locations").find(param).toArray((err, items) => {    
            err ? reject({'error': err.msg}) : resolve(items)
          })
      });
    }

    const names = req.query.names ? { name: { $in: req.query.names.split`,` }} : {}

    const result = await getLocations(names);

    res.send(result);     
  });
  
};