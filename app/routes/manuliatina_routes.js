var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  const errorMessage = (code, text) => {
    return {
      "message": {
        'code': code,
        'text': text
      }
    }
  }

  app.get('/locations', async (req, res) => {
    const getLocations = (param) => {
      return new Promise((resolve, reject) => {
          db.collection("locations").find(param).toArray((err, items) => {    
            err ? reject({'error': err.msg}) : resolve(items)
          })
      });
    }
    const getNavigation = (param) => {
      return new Promise((resolve, reject) => {
          db.collection("navigation").find(param).toArray((err, items) => {    
            err ? reject({'error': err.msg}) : resolve(items)
          })
      });
    }

    const names = req.query.names ? { name: { $in: req.query.names.split`,` }} : {}
    let result
    let locations = await getLocations(names);

    if (!locations.length) {
      res.status(500).json(errorMessage(1, "Can't get locations data"));
    } else {
      let navigation = await getNavigation(names)

      if (navigation.length) {
        for (item of locations) {
          item.navigation = navigation.find( ({ name }) => name === item.name ).locations
        }
      }         
  
      res.send(locations);
    }
  });
  
};