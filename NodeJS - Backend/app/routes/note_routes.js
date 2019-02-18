var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

        // GET Employee (By ID)
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err,item) => {
      if (err) {
        res.send({'Error':'An error has occured in GET.'})
      } else {
        res.send(item)
      };
    });
  });

      // GET Employee (All)
  app.get("/notes", (req, res) => {
    db.collection('notes').find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
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

  app.delete('/notes/:LoginID', (req, res) => {
    const id = req.params.LoginID
    const details = {'LoginID': LoginID };
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
