var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

        // Enabling CORS
        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });


        // GET Elements by LoginID
        app.get('/notes/:EmailID', (req, res) => {
          const mailid = req.params.emailid
          const details = {'EmailID': mailid };
          db.collection('notes').findOne(details, (err,item) => {
            if (err) {
              res.status(500).send({'Error':'An error has occured in GET.'})
            } else {
              res.send(item)
            };
          });
        });

        // GET all Elements
        app.get("/notes", (req, res) => {
            db.collection('notes').find({}).toArray((err, result) => {
                if(err) {
                    return res.status(500).send({'Error':'An error has occured in GET.'});
                }
                res.send(result);
            });
        });

        app.get("/Skills", (req, res) => {
          db.collection('Skills').find({}).toArray((err, result) => {
          if(err) {
              return res.status(500).send({'Error':'An error has occured in GET.'});
          }
          res.send(result);
        });
      });

      app.get("/Projects", (req, res) => {
      db.collection('Projects').find({}).toArray((err, result) => {
          if(err) {
              return res.status(500).send({'Error':'An error has occured in GET.'});
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
              res.status(500).send({'Error':'An error has occured in GET.'})
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
              res.status(500).send({'Error':'An error has occured in GET.'})
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

          //PUT selected Elements (By EmailID)
          app.put('/notes/:EmailID', (req, res) => {
            const mailid = req.params.EmailID
            const details = {'EmailID': mailid };
            const note = { LoginID: req.body.LoginID, Name: req.body.Name, Password: req.body.Password, SkillsID: req.body.SkillsID, ProjectsID: req.body.ProjectsID };
            db.collection('notes').update(details, note, (err, item) => {
              if (err) {
                res.send({'Error':'An error has occured in PUT.'})
              } else {
                res.send(item)
              };
            });
          });

          app.put('/Skills/:SkillID', (req, res) => {
            const skillid = req.params.SkillID
            const details = {'SkillID': skillid };
            const note = { Skill: req.body.Skill };
            db.collection('notes').update(details, note, (err, item) => {
              if (err) {
                res.send({'Error':'An error has occured in PUT.'})
              } else {
                res.send(item)
              };
            });
          });

          app.put('/Projects/:ProjectID', (req, res) => {
            const projectid = req.params.ProjectID
            const details = {'ProjectID': projectid };
            const note = { Name: req.body.Name, SkillsID: req.body.SkillsID };  // Check if it passes array
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

        app.delete('/Skills/:id', (req, res) => {
          const id = req.params.id
          const details = {'_id': new ObjectID(id) };
          db.collection('Skills').remove(details, (err,item) => {
            if (err) {
              res.send({'Error':'An error has occured in DELETE.'})
            } else {
              res.send("Note" + id + "deleted");
            };
          });
        });

        app.delete('/Projects/:id', (req, res) => {
          const id = req.params.id
          const details = {'_id': new ObjectID(id) };
          db.collection('Projects').remove(details, (err,item) => {
            if (err) {
              res.send({'Error':'An error has occured in DELETE.'})
            } else {
              res.send("Note" + id + "deleted");
            };
          });
        });

        // POST for single
        app.post('/notes', (req,res) => {
          const note = { name: req.body.name, emailid: req.body.emailid, password: req.body.password, skill: req.body.skill, project: req.body.project, admin: req.body.admin };
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
          const note = { skillid: req.body.skillid, skill: req.body.skill };
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
          const note = {projectid: req.body.projectid, name: req.body.name, skill: req.body.skill };  // Check if it passes Array
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
