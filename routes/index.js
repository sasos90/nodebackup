var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;

var collectionList = ["storages", "relations"];

/* GET home page. */
router.get("/", (req, res, next) => {

    mongoose.connect("mongodb://localhost:27017/nodebackup");
    db.on("error", function() {
        console.error(console, "connection error:");
    });
    db.once("open", function() {
        // we're connected!
        console.log("DB connection opened now");
    });

    res.render("index", { title: "Express" });
});

function createCollections(db, callback, index = 0) {

    if (collectionList.length !== index) {
        db.createCollection(collectionList[index]).then(() => {
            console.log("Created " + collectionList[index]);
            createCollections(db, callback, ++index);
        });
    } else {
        // done
        callback();
    }
}

module.exports = router;
