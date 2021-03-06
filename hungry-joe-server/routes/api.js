var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Users = require('../models/users'),
    Comments = require('../models/comments'),
    RestaurantLists = require('../models/restaurantLists'),
    MenuLists = require('../models/menuLists'),
    Rating = require('../models/rating');
    
router.post('/users/register', function(req, res) {
  Users.register(new Users({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/users/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

router.get('/users/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

router.get('/users', function(req, res) {
    Users.find(function(err, Users ) {
        if (err)
            res.send(err)
        res.json(Users);
    });
});

router.get('/users/:username', function(req, res) {
    Users.findOne({ username: req.params.username }, function(err, Users) {
      if (err) return console.error(err);
        res.json(Users);
    });
});

router.get('/comments/:restaurant_id', function(req, res) {
    if (req.params.restaurant_id) {
      Comments.find({ restaurant_id: req.params.restaurant_id }, function(err, Comments) {
          if (err)
              res.send(err)
          res.json(Comments);
      });
    }
});

router.post('/comments', function(req, res) {
  var comment = new Comments(req.body);
  comment.save(function (err, result) {
    res.json(result);
  });
});

router.get('/restaurantlists', function(req, res) {
    RestaurantLists.find(function(err, RestaurantLists ) {
        if (err)
            res.send(err)
        res.json(RestaurantLists);
    });
});
router.post('/restaurantlists', function(req, res) {
  var restaurant = new RestaurantLists(req.body);
  restaurant.save(function (err, result) {
    res.json(result);
  });
});
router.get('/restaurantlists/:gres_id', function(req, res) {
    RestaurantLists.findOne({ gres_id:req.params.gres_id},function(err, RestaurantLists ) {
        if (err)
            res.send(err)
        res.json(RestaurantLists);
    });
});

router.get('/menulists', function(req, res) {
    MenuLists.find(function(err, MenuLists ) {
        if (err)
            res.send(err)
        res.json(MenuLists);
    });
});

router.get('/rating/:restaurant_id',function(req, res) {
    if (req.params.restaurant_id) {
      Rating.find({ restaurant_id: req.params.restaurant_id }, function(err, Rating) {
          if (err)
              res.send(err)
          res.json(Rating);
      });
    }  
});
router.post('/rating', function(req, res) {
  var rating = new Rating(req.body);
  rating.save(function (err, result) {
    res.json(result);
  });
});



module.exports = router;