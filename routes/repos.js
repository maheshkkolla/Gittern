var express = require('express');
var router = express.Router();
var reposService = require('../services/repos');

router.get('/', function(req, res, next) {
  var path = req.query.path;
  reposService.getAll(path, function(error, repos) {
      if(error) next(error);
      else res.render('repos', { path: path, repos: repos });
  });
});

router.get('/repo/status', function(req, res, next) {
    var path = req.query.path;
    reposService.getStatus(path, function(error, status) {
        if(error) next(error);
        else res.render('_repoStatus', { status: status });
    });
});

router.get('/repo/logs', function(req, res, next) {
    var path = req.query.path;
    var offset = req.query.offset || 0;
    reposService.getLogs(path, offset, function(error, logs, count) {
        if(error) next(error);
        else res.render('_repoLogs', { logs: logs, count: count, offset: offset });
    });
});




module.exports = router;
