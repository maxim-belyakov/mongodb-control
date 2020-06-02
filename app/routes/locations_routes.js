var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // app.get('/locations/:id', (req, res) => {
  //   console.log('req.params.id', req.params.id);
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('notes').findOne(details, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send(item);
  //     } 
  //   });
  // });

  
  app.get('/locations/:name', (req, res) => {
    console.log('req.params.name', req.params.name);
    const name = req.params.name;
    const details = { 'name': name };
    db.collection('locations').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  // Function to handle the root path
  // app.get('/', async function(req, res) {

  //   // Access the provided 'page' and 'limt' query parameters
  //   let page = req.query.page;
  //   let limit = req.query.limit;

  //   let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();

  //   // Return the articles to the rendering engine
  //   res.render('index', {
  //       articles: articles
  //   });
  // });

  app.get('/locations', (req, res) => {
    // const details = { 'name': name };

    // { tags: ["red", "blank"] }
    // db.collection("locations").find( { tags: { $all: { $all: names } } ) 

    console.log(`req.query.names ${req.query.names}`)

    if (req.query.names) {
      const names = req.query.names.split`,`;
      db.collection("locations").find({ name: { $in: names }}).toArray((err, items) => {
        if (err) res.send({'error':'An error has occurred'});
        else res.send(items);
      } ) 
    } else {
      db.collection("locations").find({}).toArray((err, item) => {
        if (err) res.send({'error':'An error has occurred'});
        else res.send(item);
      }); 
    }
     
  });




  
  
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.put ('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};