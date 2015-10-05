var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Users = require('../models/users'),
    Comments = require('../models/comments'),
    RestaurantLists = require('../models/restaurantLists'),
    MenuLists = require('../models/menuLists');
    
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

router.get('/comments', function(req, res) {
    Comments.find(function(err, Comments) {
        if (err)
            res.send(err)
        res.json(Comments);
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
    RestaurantLists.find({ gres_id:req.params.gres_id},function(err, RestaurantLists ) {
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

router.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});



module.exports = router;