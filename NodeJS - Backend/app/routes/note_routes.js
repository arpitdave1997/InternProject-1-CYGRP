var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

  app.get("/notes", (req, res) => {
      db.collection('notes').find({}).toArray((err, result) => {
          if(err) {
              return res.status(500).send(err);
          }
          res.send(result);
      });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) };
    const note = { title: req.body.LoginID, title: req.body.Name, title: req.body.Password };
    db.collection('notes').update(details, note, (err, item) => {
      if (err) {
        res.send({'Error':'An error has occured in PUT.'})
      } else {
        res.send(item)
      };
    });
  });


  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err,item) => {
      if (err) {
        res.send({'Error':'An error has occured in DELETE.'})
      } else {
        res.send("Note" + id + "deleted");
      };
    });
  });

  app.post('/notes', (req,res) => {
    const note = { title: req.body.LoginID, title: req.body.Name, title: req.body.Password };
    db.collection('notes').insert(note, (err, result) => {
        if (err) {
          res.send({'Error' : 'An error has occured in POST.'});
        }
        else {
          res.send(result.ops[0])
        }
    });
  });
};
