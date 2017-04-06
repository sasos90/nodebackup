/**
 * Created by saso on 10/14/16.
 */
var mongoose = require("mongoose");

// Mongoose schemas
var storageSchema = mongoose.Schema({
    name: String,
    vendorId: String,
    productId: String,
    targetStorageId: String,
    targetStorage: this
});
storageSchema.statics.getHierarchy = (callback) => {

    Storage.find({
        targetStorageId: { $ne: null }
    }, (err, storages) => {

        let assignedStorageIds = [];
        for (let storage of storages) {
            assignedStorageIds.push(storage.targetStorageId);
            assignedStorageIds.push(storage.id);
        }
        console.log(assignedStorageIds);

        assignTargets(storages, [], 0, storages.length, assignedStorageIds, callback);
    });
};
var Storage = mongoose.model("Storage", storageSchema);

var assignTargets = (storages, assignedTargets, index, size, assignedStorageIds, callback) => {

    let storage = storages[index];
    // we need to find it and attach it :)
    Storage.findById(storage.targetStorageId, (err, item) => {
        if (err) { console.error(err); }

        // assign object
        if (item !== null) {
            storage.targetStorage = item;
        }

        // put into array
        assignedTargets.push(storage);

        // whether finish the process or assign next one
        if (index === (size - 1)) {

            // also get unassigned storages
            Storage.find({
                _id: { $nin: assignedStorageIds }
            }, (err, unassignedStorages) => {

                // finally finish the process
                callback(assignedTargets, unassignedStorages);
            });
        } else {
            assignTargets(storages, assignedTargets, ++index, size, assignedStorageIds, callback);
        }
    });
};

module.exports = Storage;
