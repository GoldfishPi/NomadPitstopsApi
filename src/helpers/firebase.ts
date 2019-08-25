
import * as admin from "firebase-admin";

const serviceAccount = require('../firebase-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://nomad-pit-stops.firebaseio.com'
});

export const firebaseAdmin = admin;

export const getFirebaseUser = (token:string) => {
    return admin.auth().verifyIdToken(token);
}
