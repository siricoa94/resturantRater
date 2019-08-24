var db = require("../models");

module.exports = function(app) {
  app.get("/api/resturants", function(req, res) {
    db.Resturant.findAll({}).then(function(dbResturant) {
      res.json(dbResturant);
    });
  });

  app.get("/api/resturants/:id", function(req, res) {
    db.Resturant.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbResturant) {
      res.json(dbResturant);
    });
  });

  app.post("/api/resturants", function(req, res) {
    console.log(req.body);
    db.Resturant.create(req.body).then(function(dbResturant) {
      res.json(dbResturant);
    });
  });

  app.delete("/api/resturants/:id", function(req, res) {
    db.Resturant.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbResturant) {
      res.json(dbResturant);
    });
  });

};
