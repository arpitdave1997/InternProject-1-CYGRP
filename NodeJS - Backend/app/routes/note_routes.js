var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

        // Enabling CORS
        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });


        // GET Elements by LoginID
        app.get('/notes/:LoginID', (req, res) => {
          const logid = req.params.LoginID
          const details = {'LoginID': logid };
          db.collection('notes').findOne(details, (err,item) => {
            if (err) {
              res.send({'Error':'An error has occured in GET.'})
            } else {
              res.send(item)
            };
          });
        });

        // GET all Elements
        app.get("/notes", (req, res) => {
            db.collection('notes').find({}).toArray((err, result) => {
                if(err) {
                    return res.status(500).send(err);
                }
                res.send(result);
            });
        });
  app.get("/Skills", (req, res) => {
      db.collection('Skills').find({}).toArray((err, result) => {
          if(err) {
              return res.status(500).send(err);
          }
          res.send(result);
      });
  });
  app.get("/Projects", (req, res) => {
      db.collection('Projects').find({}).toArray((err, result) => {
          if(err) {
              return res.status(500).send(err);
          }
          res.send(result);
      });
  });

        // GET selected Elements
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
  app.get('/Skills/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) };
    db.collection('Skills').findOne(details, (err,item) => {
      if (err) {
        res.send({'Error':'An error has occured in GET.'})
      } else {
        res.send(item)
      };
    });
  });
  app.get('/Projects/:id', (req, res) => {
    const id = req.params.id
    const details = {'_id': new ObjectID(id) };
    db.collection('Projects').findOne(details, (err,item) => {
      if (err) {
        res.send({'Error':'An error has occured in GET.'})
      } else {
        res.send(item)
      };
    });
  });

          //PUT selected Elements
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

        //Delete selected Elements
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

        // POST for single
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
        app.post('/Skills', (req,res) => {
          const note = { title: req.body.LoginID, title: req.body.Name, title: req.body.Password };
          db.collection('Skills').insert(note, (err, result) => {
              if (err) {
                res.send({'Error' : 'An error has occured in POST.'});
              }
              else {
                res.send(result.ops[0])
              }
          });
        });
        app.post('/Projects', (req,res) => {
          const note = { title: req.body.LoginID, title: req.body.Name, title: req.body.Password };
          db.collection('Projects').insert(note, (err, result) => {
              if (err) {
                res.send({'Error' : 'An error has occured in POST.'});
              }
              else {
                res.send(result.ops[0])
              }
          });
        });
};
