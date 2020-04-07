// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

// https://github.com/firebase/functions-samples/blob/master/child-count/functions/index.js

exports.updateCount = functions.database.ref('/expenses/{collectionId}/{id}')
    .onWrite((change) => {
        const expensesRef = change.after.ref.parent;

        return expensesRef.once('value').then((snapshot) => {
            return admin.database()
                .ref('/collections/' + expensesRef.key)
                .update({ count: snapshot.numChildren() })
        });
    });

/*
exports.updateCountRecursive = functions.database.ref('/collections/{collectionId}/count')
    .onUpdate(async (change) => {
        const collectionRef = change.after.ref.parent;

        const collectionSnapshot = await collectionRef.once('value');

        // If the collection has a parent, it also needs to be updated.
        if (collectionSnapshot.val().collection) {

            const diff = change.after.val() - change.before.val();
            const parentCollectionRef = admin.database().ref('/collections/' + collectionSnapshot.val().collection);

            const parentCollectionSnapshot = await parentCollectionRef.once('value');
            const newCount = (parentCollectionSnapshot.val().count || 0) + diff;
            return parentCollectionRef.update({ count: newCount });
        }

        return null;
    });
    */


exports.updateCountRecursive = functions.database.ref('/collections/{collectionId}/count')
    .onUpdate(async (change) => {
        const collectionRef = change.after.ref.parent;

        const collectionSnapshot = await collectionRef.once('value');
        const parentCollectionId = collectionSnapshot.val().collection;

        // If the collection has a parent, it also needs to be updated.
        if (parentCollectionId) {
            const collections = await admin.database().ref('/collections').once('value');

            const collectionsObj = collections.val();

            // Recomputing count from all children.
            let count = 0;
            Object.keys(collectionsObj).forEach((key) => {
                const collection = collectionsObj[key];
                if (collection.collection === parentCollectionId) {
                    count += collection.count;
                }
            });

            admin.database()
                .ref('/collections/' + parentCollectionId)
                .update({ count });
        }

        return null;
    });

