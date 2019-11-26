const Note = require('../models/note.js')
// In Express, routes are wrapped in a function,
// which takes the Express instance and a database as arguments.
module.exports = function(app, db){
  app.post('/notes', (req, res) => {
    console.log(req.body)
    let _note = new Note({
      title: req.body['title'],
      body: req.body['body']
    })
    _note.save(err => {
      if (err) throw err;
      res.send('Note successfully saved!');
    })
  });
};
