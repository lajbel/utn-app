import { UploadedFile } from "express-fileupload";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from "./config.ts";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

let app: FirebaseApp;

export function connectToFirebase() {
    try {
        app = initializeApp(firebaseConfig);
        console.log("Firebase app initialized");
    }
    catch (error) {
        console.error(error);
    }
}

export function uploadImage(image: UploadedFile, name: string) {
    const storage = getStorage(app);
    const storageRef = ref(storage, name);
    const base64String = image.data.toString("base64");

    return uploadString(storageRef, base64String, "base64", {
        contentType: image.mimetype,
    });
}
