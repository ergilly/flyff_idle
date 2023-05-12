import firebase_app from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function getCurrentUser() {
    let result = null,
        error = null;
    try {
        result = auth.currentUser;
    } catch (e) {
        error = e;
    }

    return { result, error };
}