var express = require('express');
var router = express.Router();

/* GET storage listing. */
router.get('/', (req, res, next) => {
  res.render("storages", {title: 'Storages'});
});

module.exports = router;
