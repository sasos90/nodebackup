var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var collectionList = ["storages", "relations"];

/* GET home page. */
router.get('/', function(req, res, next) {

    MongoClient.connect('mongodb://localhost:27017/nodebackup', function(err, db) {
        if (err) {
            throw err;
        }

        // create collections in case they doesn't exist
        console.log("Start creating collections");
        createCollections(db, 0, function() {

            // we start here!
            console.log("Really done");

            /*db.collection('storages').find().toArray(function(err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);
            });*/
        });
    });

    res.render('index', { title: 'Express' });
});

function createCollections(db, index, callback) {

    if (collectionList.length !== index ) {
        db.createCollection(collectionList[index]).then(function() {
            console.log("Created " + collectionList[index]);
            createCollections(db, ++index, callback);
        });
    } else {
        // done
        callback();
    }
}

module.exports = router;
