var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Storage = mongoose.model("Storage");

/* GET storage listing. */
router.get('/', (req, res, next) => {

    render(res);
});

let render = (res) => {

    Storage.find((err, storages) => {
        if (err) return console.error(err);

        console.log(storages);
        let storageList = storages;

        res.render("storages", {
            title: 'Storages',
            storages: storageList
        });
    });
};

module.exports = router;
