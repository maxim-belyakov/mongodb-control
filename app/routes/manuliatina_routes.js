var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {


  // res.status(404).send("Sorry can't find that!")
  // res.status(500).send("Sorry can't load that!") test

  const errorMessage = (code, text) => {
    return {
      "message": {
        'code': code,
        'text': text
      }
    }
  }

  app.get('/maks', (req, res) => {
    res.send("This is Maaaaaaaaks! Wooow");
  });

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
      res.status(404).json(errorMessage(1, "Not found locations data"));
    } else {
      let navigation = await getNavigation(names)

      if (navigation.length) {
        for (item of locations) {
          let naviItem = navigation.find( ({ name }) => name === item.name )
          if (naviItem) item.navigation = naviItem.locations
        }
      }
  
      res.send(locations);
    }
  });
  
};