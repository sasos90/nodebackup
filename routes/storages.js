var express = require('express');
var router = express.Router();

/* GET storage listing. */
router.get('/', (req, res, next) => {

  let storageList = [
      {
          name: "USB A",
          vendorId: "1234",
          productId: "abcd"
      }, {
          name: "USB B",
          vendorId: "5678",
          productId: "efgh"
      }
  ];
  res.render("storages", {
      title: 'Storages',
      storages: storageList
  });
});

module.exports = router;
