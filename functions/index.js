const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Update the collection count property when an expense is added/removed from a collection.
exports.updateCount = functions.database.ref('/expenses/{collectionId}/{id}')
    .onWrite((change) => {
        const expensesRef = change.after.ref.parent;

        return expensesRef.once('value').then((snapshot) => {
            return admin.database()
                .ref('/collections/' + expensesRef.key)
                .update({ count: snapshot.numChildren() })
        });
    });

// Update parent collection when a collection count is updated.
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

