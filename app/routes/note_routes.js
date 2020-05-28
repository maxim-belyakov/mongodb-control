var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/notes/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
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
};