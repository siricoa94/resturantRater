var db = require("../models");

module.exports = function(app) {

  app.get("/api/savings", function(req, res) {
    var query = {};
    if (req.query.resturant_id) {
      query.ResturantId = req.query.resturant_id;
    }
    db.Review.findAll({
      where: query
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  app.get("/api/reviews/:id", function(req, res) {
    db.Review.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbReview) {
      console.log(dbReview);
      res.json(dbReview);
    });
  });

  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  app.delete("/api/reviews/:id", function(req, res) {
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  app.put("/api/reviews", function(req, res) {
    db.Review.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};
