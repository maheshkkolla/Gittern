var express = require('express');
var router = express.Router();
var reposService = require('../services/repos');

router.get('/', function(req, res, next) {
  var path = req.query.path;
  reposService.getAll(path, function(error, repos) {
      if(error) next(error);
      else res.render('repos', { repos: repos });
  });
});

module.exports = router;
