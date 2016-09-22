var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var collectionList = ["storages", "relations"];

/* GET home page. */
router.get('/', (req, res, next) => {

    MongoClient.connect('mongodb://localhost:27017/nodebackup', (err, db) => {
        if (err) {
            throw err;
        }

        // create collections in case they doesn't exist
        console.log("Start creating collections");
        createCollections(db, () => {

            // we start here!
            console.log("Really done");

            /*db.collection('storages').find().toArray((err, result) => {
                if (err) {
                    throw err;
                }
                console.log(result);
            });*/
        });
    });

    res.render('index', { title: 'Express' });
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
