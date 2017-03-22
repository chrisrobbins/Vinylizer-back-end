const passport = require('passport');

const AuthenticationController = require('../controllers/AuthenticationController');
const passportService = require('./passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var router = require('express').router();

function protected(req, res, next) {
  res.send("here's the secret!");
}

router.route('/protected')
  .get(protected);

  router.route('/signup')
    .post(AuthenticationController.signup);

  module.exports = router;
