import firebase_app from "../config";
import { sendPasswordResetEmail , getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function resetPassword(email) {
    let result = null,
        error = null;
    try {
        result = await sendPasswordResetEmail(auth, email);
    } catch (e) {
        error = e;
    }

    return { result, error };
}