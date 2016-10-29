var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Storage = require('../models/Storage');
var db = mongoose.connection;

/* GET storage listing. */
router.get('/', (req, res, next) => {

    if (mongoose.connection.readyState === 0) {
        var client = mongoose.connect("mongodb://localhost:27017/nodebackup");
    }
    db.on("error", (err) => {
        console.error(err);
        console.error("connection error:");
    });

    // check if database is opened
    if (mongoose.connection.readyState === 0) {
        db.once("open", () => {
            // we're connected!
            console.log("DB connection opened now");
            render(res);
        });
    } else {
        render(res);
    }
});

var render = (res) => {

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
